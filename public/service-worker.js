const CACHE_NAME = 'biblio-cache';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/js/bundle.js',
    '/static/css/main.chunk.css',
    '/homepage',
    '/add-qualifications',
    '/settings',
    '/view-account',
    '/edit-qualification',
    '/archived-qualifications',
    '/shared-links',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_URLS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Cache API responses
    if (request.url.startsWith('/api/')) {
        // Append a timestamp to the API request to bust the cache
        const cacheKey = new Request(request.url + '?t=' + Date.now());

        event.respondWith(cacheApiData(cacheKey));
    } else {
        // Handle other types of requests (e.g., HTML, CSS, JS) as usual
        event.respondWith(
            caches.match(request).then((response) => {
                return response || fetch(request);
            })
        );
    }
});

async function cacheApiData(request) {
    const cache = await caches.open(CACHE_NAME);

    // Check if the response is already in the cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    // If not, fetch the data from the network and store it in the cache
    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());

    return networkResponse;
}

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                    return null;
                })
            );
        })
    );
});
