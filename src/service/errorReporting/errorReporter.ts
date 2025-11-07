/* eslint-disable no-console */
// Debug-friendly error reporter with Background Sync + IndexedDB queue handled by service worker.

type ErrorReportPayload = {
  error_text: string;
  page_url: string;
  user_agent?: string | null;
  stack_trace?: string | null;
  session_id?: string | null;
  extra?: Record<string, unknown> | null;
};

type ErrorReportEnvelope = ErrorReportPayload & {
  id?: string;
  attempt?: number;
  retryAt?: number;
  createdAt?: number;
};

type SyncManager = {
  register: (tag: string) => Promise<void>;
};

const isBrowser = typeof window !== "undefined";
const DEBUG = isBrowser && (window as any).__ERROR_REPORTER_DEBUG__ !== false;

const RETRY_DELAYS = [
  5000,
  10000,
  20000,
  40000,
  80000,
  160000,
  320000,
  640000,
];

const LOCAL_QUEUE_KEY = "__error_reporter_queue__";

let isInitialized = false;

function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log("[error-reporter]", ...args);
  }
}

function ensureBrowser() {
  if (!isBrowser) {
    throw new Error("errorReporter can only be used in a browser context");
  }
}

function normalizePayload(payload: Partial<ErrorReportPayload>): ErrorReportEnvelope {
  ensureBrowser();
  const pageUrl = window.location?.href ?? "";
  const userAgent = navigator?.userAgent ?? null;

  if (!payload.error_text) {
    payload.error_text = "Unknown error";
  }

  return {
    error_text: payload.error_text?.slice(0, 10_000) ?? "",
    page_url: payload.page_url?.slice(0, 2_048) ?? pageUrl.slice(0, 2_048),
    user_agent: payload.user_agent?.slice(0, 1_024) ?? userAgent?.slice(0, 1_024) ?? null,
    stack_trace: payload.stack_trace?.slice(0, 25_000) ?? null,
    session_id: payload.session_id?.slice(0, 255) ?? null,
    extra: payload.extra ?? null,
    createdAt: Date.now(),
    attempt: 0,
  };
}

function supportsServiceWorker() {
  return isBrowser && "serviceWorker" in navigator;
}

function supportsBackgroundSync() {
  return supportsServiceWorker() && "SyncManager" in (window as any);
}

async function registerServiceWorker() {
  if (!supportsServiceWorker()) {
    debugLog("Service workers are not supported");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/error-reporter-sw.js", {
      scope: "/",
    });
    debugLog("Service worker registered", registration.scope);
    return registration;
  } catch (error) {
    console.error("Failed to register error reporter service worker", error);
    return null;
  }
}

async function getActiveServiceWorker() {
  if (!supportsServiceWorker()) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const sw = registration.active ?? registration.waiting ?? registration.installing;
    if (!sw) {
      debugLog("Service worker not active yet");
    }
    return { registration, sw };
  } catch (error) {
    console.error("Failed to get active service worker", error);
    return null;
  }
}

function readLocalQueue(): ErrorReportEnvelope[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_QUEUE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ErrorReportEnvelope[];
  } catch (error) {
    console.warn("Failed to read local error queue", error);
    return [];
  }
}

function writeLocalQueue(queue: ErrorReportEnvelope[]) {
  try {
    window.localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.warn("Failed to write local error queue", error);
  }
}

function scheduleLocalRetry(envelope: ErrorReportEnvelope) {
  const attempt = envelope.attempt ?? 0;
  const delay = RETRY_DELAYS[Math.min(attempt, RETRY_DELAYS.length - 1)];
  debugLog(`Scheduling local retry in ${delay / 1000}s`, envelope);
  setTimeout(() => {
    sendDirectly(envelope).catch((err) => {
      debugLog("Local retry failed", err);
    });
  }, delay);
}

async function sendDirectly(envelope: ErrorReportEnvelope) {
  try {
    const response = await fetch("/api/error-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        error_text: envelope.error_text,
        page_url: envelope.page_url,
        user_agent: envelope.user_agent,
        stack_trace: envelope.stack_trace,
        session_id: envelope.session_id,
        extra: envelope.extra,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    debugLog("Error report sent directly", envelope);
    removeFromLocalQueue(envelope);
    return true;
  } catch (error) {
    console.warn("Direct send failed, keeping in queue", error);
    queueInLocalStorage({
      ...envelope,
      attempt: (envelope.attempt ?? 0) + 1,
      retryAt: Date.now() + RETRY_DELAYS[Math.min(envelope.attempt ?? 0, RETRY_DELAYS.length - 1)],
    });
    scheduleLocalRetry({
      ...envelope,
      attempt: (envelope.attempt ?? 0) + 1,
    });
    return false;
  }
}

function queueInLocalStorage(envelope: ErrorReportEnvelope) {
  const queue = readLocalQueue();
  queue.push(envelope);
  writeLocalQueue(queue);
}

function removeFromLocalQueue(envelope: ErrorReportEnvelope) {
  const queue = readLocalQueue().filter((item) => item.createdAt !== envelope.createdAt);
  writeLocalQueue(queue);
}

async function flushLocalQueue() {
  const queue = readLocalQueue();
  if (!queue.length) return;

  debugLog(`Flushing ${queue.length} local queued errors`);

  for (const item of queue) {
    await sendDirectly(item);
  }
}

async function handOffToServiceWorker(envelope: ErrorReportEnvelope) {
  const active = await getActiveServiceWorker();
  if (!active?.sw) {
    debugLog("No active service worker, using direct send fallback");
    queueInLocalStorage(envelope);
    scheduleLocalRetry(envelope);
    return;
  }

  active.sw.postMessage({ type: "QUEUE_ERROR", payload: envelope });
  debugLog("Payload posted to service worker", envelope);

  if ((active.registration as ServiceWorkerRegistration & { sync?: SyncManager }).sync) {
    try {
      await (active.registration as ServiceWorkerRegistration & { sync?: SyncManager }).sync!.register("error-report-sync");
      debugLog("Background sync registered");
    } catch (error) {
      console.warn("Failed to register background sync", error);
    }
  } else {
    debugLog("Background Sync unsupported, fallback to local retry");
    queueInLocalStorage(envelope);
    scheduleLocalRetry(envelope);
  }
}

export async function initErrorReporter() {
  if (!isBrowser || isInitialized) {
    return;
  }

  isInitialized = true;

  debugLog("Initializing error reporter");

  await registerServiceWorker();

  if (!supportsBackgroundSync()) {
    debugLog("Background Sync unsupported, using direct send fallback");
    flushLocalQueue().catch((error) => {
      console.error("Failed flushing local queue", error);
    });
    return;
  }

  window.addEventListener("online", () => {
    getActiveServiceWorker().then((active) => {
      const registration = active?.registration as ServiceWorkerRegistration & { sync?: SyncManager } | undefined;
      registration?.sync
        ?.register("error-report-sync")
        .then(() => debugLog("Online event triggered sync"))
        .catch((error: unknown) => console.warn("Failed to register sync on online event", error));
    });
  });

  flushLocalQueue().catch((error) => {
    console.error("Failed flushing local queue on init", error);
  });
}

export async function reportError(payload: Partial<ErrorReportPayload>) {
  if (!isBrowser) return;

  const normalized = normalizePayload(payload);
  debugLog("Reporting error", normalized);

  if (!supportsServiceWorker()) {
    queueInLocalStorage(normalized);
    scheduleLocalRetry(normalized);
    return;
  }

  try {
    await handOffToServiceWorker(normalized);
  } catch (error) {
    console.warn("Failed to hand off to service worker, fallback to direct send", error);
    queueInLocalStorage(normalized);
    scheduleLocalRetry(normalized);
  }
}

// Expose debug API on window for manual testing
if (isBrowser) {
  (window as any).__errorReporter = {
    init: initErrorReporter,
    report: reportError,
    flushLocalQueue,
    readLocalQueue,
    handOffToServiceWorker,
  };
}


