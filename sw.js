// sw.js - Service Worker base
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Gestione base: permette il funzionamento online e gli aggiornamenti automatici
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});