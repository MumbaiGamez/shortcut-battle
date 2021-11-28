const cacheName = `cache-${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== cacheName)
            .map((name) => caches.delete(name))
        )
      )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request).catch(() => {
        caches.open(cacheName).then((cache) => {
          return cache.match(event.request.url);
        });
      })
    );
  }
});
