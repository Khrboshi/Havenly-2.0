"use client";

import "./globals.css";
import { cn } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import { Toaster } from "sonner";
import { useEffect } from "react";

export default function MobileLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        reg.onupdatefound = () => {
          const newWorker = reg.installing;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Force update on mobile
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
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>

      <body className={cn("min-h-screen bg-background antialiased pb-20")}>
        {children}

        {/* Mobile bottom navigation */}
        <BottomNav />

        {/* Toast notifications */}
        <Toaster />
      </body>
    </html>
  );
}
