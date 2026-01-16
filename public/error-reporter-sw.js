/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

const DEBUG = location.hostname === 'localhost';
const REPORT_URL = DEBUG ? "http://localhost:8080/api/error-report/" : "/api/error-report/";
const DB_NAME = "error-reporter-db";
const DB_VERSION = 1;
const STORE_NAME = "queue";
const RETRY_DELAYS = [
  5000,
  10000,
  20000,
  60000,
  120000,
  240000,
  480000,
  960000,
]; // 5s, 10s, 20s, 1m, 2m, 4m, 8m, 16m

const log = (...args) => {
  if (DEBUG) {
    console.log("[error-reporter-sw]", ...args);
  }
};

self.addEventListener("install", (event) => {
  log("installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  log("activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  const { data } = event;
  if (!data || typeof data !== "object") return;

  if (data.type === "QUEUE_ERROR" && data.payload) {
    const envelope = withEnvelopeDefaults(data.payload);
    log("Received QUEUE_ERROR", envelope);
    event.waitUntil(queueEnvelope(envelope).then(() => scheduleSync()));
  }
});

self.addEventListener("sync", (event) => {
  if (event.tag === "error-report-sync") {
    log("sync event triggered");
    event.waitUntil(flushQueue());
  }
});

function withEnvelopeDefaults(envelope) {
  return {
    ...envelope,
    id: envelope.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    attempt: envelope.attempt ?? 0,
    retryAt: envelope.retryAt ?? Date.now(),
    createdAt: envelope.createdAt ?? Date.now(),
  };
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function queueEnvelope(envelope) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.objectStore(STORE_NAME).put(envelope);
  });
}

async function deleteEnvelope(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.objectStore(STORE_NAME).delete(id);
  });
}

async function updateEnvelope(envelope) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.objectStore(STORE_NAME).put(envelope);
  });
}

async function getAllEnvelopes() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

let syncScheduled = false;
let scheduledTimeoutId = null;
let scheduledTargetTime = 0;

function clearScheduledTimeout() {
  console.log('clearScheduledTimeout');
  if (scheduledTimeoutId !== null) {
    clearTimeout(scheduledTimeoutId);
    scheduledTimeoutId = null;
    scheduledTargetTime = 0;
  }
}

async function flushQueue() {
  log("Flushing queue");
  let envelopes;

  try {
    envelopes = await getAllEnvelopes();
  } catch (error) {
    console.error("Failed to read queue", error);
    return;
  }

  if (envelopes.length === 0) {
    log("Queue is empty");
    syncScheduled = false;
    clearScheduledTimeout();
    return;
  }

  const now = Date.now();
  let hasPending = false;
  let hasReady = false;
  let earliestRetry = Infinity;

  for (const envelope of envelopes) {
    if (envelope.retryAt && envelope.retryAt > now) {
      hasPending = true;
      if (envelope.retryAt < earliestRetry) {
        earliestRetry = envelope.retryAt;
      }
      continue;
    }

    hasReady = true;

    try {
      const payload = {
        error_text: envelope.error_text,
        page_url: envelope.page_url,
        user_agent: envelope.user_agent,
        stack_trace: envelope.stack_trace,
        user: envelope.user,
        extra: envelope.extra,
      };

      const response = await fetch(REPORT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      log("Successfully sent", envelope.id);
      await deleteEnvelope(envelope.id);
    } catch (error) {
      log("Failed to send", envelope.id, error);
      const nextAttempt = (envelope.attempt ?? 0) + 1;

      if (DEBUG || nextAttempt >= RETRY_DELAYS.length) {
        console.error("Dropping envelope after max retries", envelope.id);
        await deleteEnvelope(envelope.id);
        continue;
      }

      const delay = RETRY_DELAYS[Math.min(nextAttempt, RETRY_DELAYS.length - 1)];
      const retryAt = Date.now() + delay;
      hasPending = true;
      if (retryAt < earliestRetry) {
        earliestRetry = retryAt;
      }

      await updateEnvelope({
        ...envelope,
        attempt: nextAttempt,
        retryAt,
      });
    }
  }

  // Если были готовые элементы, но они не отправились, или есть pending элементы
  if (hasPending) {
    const waitTime = Math.max(0, earliestRetry - Date.now());
    log(`Rescheduling sync in ${waitTime}ms`);
    scheduleSync(waitTime);
  } else if (hasReady) {
    // Если были готовые элементы и они все отправились, но могут быть новые
    // Не планируем повторный sync, он будет вызван при добавлении нового элемента
    syncScheduled = false;
    clearScheduledTimeout();
  } else {
    // Все элементы в будущем, планируем sync на нужное время
    const waitTime = Math.max(0, earliestRetry - Date.now());
    log(`All items are scheduled for future, rescheduling sync in ${waitTime}ms`);
    scheduleSync(waitTime);
  }
}

function scheduleSync(delay = 0) {
  if (delay > 0) {
    log(`Scheduling sync with delay ${delay}ms`);
    const targetTime = Date.now() + delay;

    if (scheduledTimeoutId !== null) {
      if (targetTime >= scheduledTargetTime) {
        log("Existing delayed sync is sooner, skipping reschedule");
        return Promise.resolve();
      }
      clearScheduledTimeout();
    }

    scheduledTargetTime = targetTime;
    scheduledTimeoutId = setTimeout(() => {
      scheduledTimeoutId = null;
      scheduledTargetTime = 0;
      scheduleSync(0);
    }, delay);
    return Promise.resolve();
  }

  if (syncScheduled) {
    log("Sync already registered, skipping immediate registration");
    return Promise.resolve();
  }

  syncScheduled = true;
  return self.registration.sync
    .register("error-report-sync")
    .then(() => {
      log("Sync registered immediately");
    })
    .catch((error) => {
      console.error("Failed to register sync", error);
    })
    .finally(() => {
      syncScheduled = false;
    });
}

