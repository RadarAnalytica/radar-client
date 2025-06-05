export class CacheManager {

    constructor(config = {}) {
        this.config = {
            name: config.name || 'apiCache',
            version: config.version || 1,
            storeName: config.storeName || 'apiResponses',
            defaultTTL: config.defaultTTL || 24 * 60 * 60 * 1000 // 24 часа
        };
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            // обработка ошибки если браузер не поддерживает indexedDb
            if (!('indexedDB' in window)) reject('not supported');

            const request = indexedDB.open(this.config.name, this.config.version);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.config.storeName)) {
                    const store = db.createObjectStore(this.config.storeName, { keyPath: 'url' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }

    async get(url) {
        try {
            if (!this.db) await this.init();
            
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.config.storeName], 'readonly');
                const store = transaction.objectStore(this.config.storeName);
                const request = store.get(url);

                request.onsuccess = () => {
                    const data = request.result;
                    if (data && Date.now() - data.timestamp < data.ttl) {
                        resolve(data);
                    } else {
                        resolve(null);
                    }
                };
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Cache read error:', error);
            return null;
        }
    }

    async set(url, data, ttl = this.config.defaultTTL) {
        try {
            if (!this.db) await this.init();

            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.config.storeName], 'readwrite');
                const store = transaction.objectStore(this.config.storeName);
                const request = store.put({
                    url,
                    data,
                    timestamp: Date.now(),
                    ttl
                });

                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Cache write error:', error);
        }
    }

    async delete(url) {
        try {
            if (!this.db) await this.init();

            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.config.storeName], 'readwrite');
                const store = transaction.objectStore(this.config.storeName);
                const request = store.delete(url);

                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Cache delete error:', error);
        }
    }

    async cleanup() {
        try {
            if (!this.db) await this.init();

            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.config.storeName], 'readwrite');
                const store = transaction.objectStore(this.config.storeName);
                const index = store.index('timestamp');
                const request = index.openCursor();

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        const data = cursor.value;
                        if (Date.now() - data.timestamp > data.ttl) {
                            cursor.delete();
                        }
                        cursor.continue();
                    } else {
                        resolve();
                    }
                };
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Cache cleanup error:', error);
        }
    }
}



export class ApiService {
    constructor(cacheConfig = {}) {
        this.cache = new CacheManager(cacheConfig);
        this.defaultOptions = {
            ttl: cacheConfig.defaultTTL || 24 * 60 * 60 * 1000,
            forceRefresh: false,
            onCacheHit: () => {},
            onCacheMiss: () => {},
            onError: () => {}
        };
    }

    // Основной метод для работы с API
    async fetch(url, options = {}) {
        const mergedOptions = { ...this.defaultOptions, ...options };
        const {
            ttl,
            forceRefresh,
            onCacheHit,
            onCacheMiss,
            onError
        } = mergedOptions;

        try {
            // Проверяем кэш, если не требуется принудительное обновление
            if (!forceRefresh) {
                const cachedData = await this.cache.get(url);
                if (cachedData) {
                    onCacheHit(cachedData.data);
                    return cachedData.data;
                }
            }

            // Если данных нет в кэше или требуется обновление, делаем запрос
            onCacheMiss();
            const response = await fetch(url, {headers: {
                'cache-control': 'public, must-revalidate, max-age=86400',
                'content-type': 'application/json'
            }});
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Сохраняем в кэш
            await this.cache.set(url, data, ttl);
            
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            onError(error);

            // В случае ошибки пытаемся использовать кэш, даже если он устарел
            const cachedData = await this.cache.get(url);
            if (cachedData) {
                return cachedData.data;
            }
            throw error;
        }
    }

    // Метод для принудительного обновления данных
    async refresh(url, options = {}) {
        return this.fetch(url, { ...options, forceRefresh: true });
    }

    // Метод для очистки кэша
    async cleanup() {
        return this.cache.cleanup();
    }
}