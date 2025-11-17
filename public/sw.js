/* TEMPORARILY DISABLED SERVICE WORKER */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  caches.keys().then(keys => {
    keys.forEach(key => caches.delete(key));
  });
});
