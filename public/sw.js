// Disable all previous service workers completely
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", async () => {
  // Unregister SW
  const registrations = await self.registration.unregister();
  // Delete all caches
  const keys = await caches.keys();
  for (const key of keys) {
    await caches.delete(key);
  }
  self.clients.claim();
});
