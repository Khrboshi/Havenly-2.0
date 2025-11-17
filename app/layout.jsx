"use client";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import BottomNav from "@/components/BottomNav";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        // Auto-update when new version is available
        reg.onupdatefound = () => {
          const newWorker = reg.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              window.location.reload();
            }
          });
        };
      });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0D7A7E" />

        {/* iOS support */}
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>

      <body className={cn("min-h-screen bg-background antialiased pb-20")}>
        {children}

        {/* Always visible bottom nav */}
        <BottomNav />

        {/* Global toast notifications */}
        <Toaster />
      </body>
    </html>
  );
}
