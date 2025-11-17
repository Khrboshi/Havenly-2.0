"use client";

import { useEffect } from "react";

export default function ForceReload() {
  useEffect(() => {
    async function resetSW() {
      // Unregister all service workers
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      }

      // Delete caches
      if (window.caches) {
        const keys = await caches.keys();
        for (const key of keys) {
          await caches.delete(key);
        }
      }

      // Force HARD reload
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }

    resetSW();
  }, []);

  return null;
}
