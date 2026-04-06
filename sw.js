const CACHE_NAME = '2048-v1';
const ASSETS = [
    './',
    './index.html',
    './style/main.css',
    './js/bind_polyfill.js',
    './js/classlist_polyfill.js',
    './js/animframe_polyfill.js',
    './js/keyboard_input_manager.js',
    './js/html_actuator.js',
    './js/grid.js',
    './js/tile.js',
    './js/local_storage_manager.js',
    './js/game_manager.js',
    './js/application.js',
    './pwa_icon_512.png',
    './favicon.ico'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});
