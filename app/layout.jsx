"use client";

import "./globals.css";
import { Toaster } from "sonner";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(reg => {
        // Auto-refresh logic
        reg.onupdatefound = () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.onstatechange = () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // Tell the new SW to activate immediately
              newWorker.postMessage("SKIP_WAITING");

              // Reload the page to get new version
              window.location.reload();
            }
          };
        };
      });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0D7A7E" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
      </head>

      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
