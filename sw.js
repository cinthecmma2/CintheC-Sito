// sw.js - Service Worker corretto per SmoothTech
const CACHE_NAME = 'smoothtech-v2';
const ASSETS_TO_CACHE = [
    '/smoothtech.html',
    '/tornei.html',
    '/tornei1.html',
    '/tatami-live.html',
    '/privacy.html',
    '/note-legali.html',
    '/icon-192.png',
    '/icon-512.png'
];

// Installazione: scarica e memorizza i file in cache
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Attivazione: pulisce le vecchie cache
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Intercettazione richieste: usa la rete, se cade passa alla cache offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});