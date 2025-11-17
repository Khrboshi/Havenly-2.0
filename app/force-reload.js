"use client";

import { useEffect } from "react";

export default function ForceReload() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (let reg of regs) {
          reg.unregister();
        }
      });

      // Hard clear cache storage
      if (window.caches) {
        caches.keys().then((keys) =>
          keys.forEach((key) => caches.delete(key))
        );
      }

      // Hard reload page after killing SW
      setTimeout(() => {
        window.location.reload(true);
      }, 300);
    }
  }, []);

  return null;
}
