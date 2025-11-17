// --- SERVICE WORKER RESET MODE ---
// This file unregisters old SWs and clears caches on all clients.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
  // Unregister all old service workers
  try {
    await self.registration.unregister();
  } catch (e) {
    console.error("SW unregister failed:", e);
  }

  // Delete all caches
  try {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  } catch (e) {
    console.error("Cache cleanup failed:", e);
  }

  // Take control immediately
  self.clients.claim();
});
