// Service Worker for Bakardy Kite
const CACHE_NAME = 'bakardy-kite-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Cache strategies
const CACHE_STRATEGIES = {
    // Cache first for static assets
    static: ['/img/', '/fonts/', '/static/'],
    // Network first for API calls
    network: ['/api/', '/reviews/'],
    // Stale while revalidate for content
    stale: ['/content/']
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll([
                '/',
                '/img/Bakar.jpeg',
                '/fonts/Motiva-Sans-Bold.ttf',
                '/fonts/Motiva-Sans-Light.ttf',
                '/favicon.svg',
                '/manifest.json'
            ]);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
    const url = new URL(request.url);

    // Static assets - Cache First
    if (isStaticAsset(url.pathname)) {
        return cacheFirst(request, STATIC_CACHE);
    }

    // API calls - Network First
    if (isApiCall(url.pathname)) {
        return networkFirst(request, DYNAMIC_CACHE);
    }

    // Content - Stale While Revalidate
    if (isContent(url.pathname)) {
        return staleWhileRevalidate(request, DYNAMIC_CACHE);
    }

    // Default - Network First
    return networkFirst(request, DYNAMIC_CACHE);
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Cache first failed:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Offline', { status: 503 });
    }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            const cache = caches.open(cacheName);
            cache.then(c => c.put(request, networkResponse.clone()));
        }
        return networkResponse;
    }).catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(pathname) {
    return CACHE_STRATEGIES.static.some(pattern => pathname.includes(pattern));
}

function isApiCall(pathname) {
    return CACHE_STRATEGIES.network.some(pattern => pathname.includes(pattern));
}

function isContent(pathname) {
    return CACHE_STRATEGIES.stale.some(pattern => pathname.includes(pattern));
}
