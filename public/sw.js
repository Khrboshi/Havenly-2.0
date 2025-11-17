// Basic service worker for PWA installation
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// Optional offline fallback (add more later)
self.addEventListener("fetch", () => {});
