"use client";

import "./globals.css";
import { Toaster } from "sonner";
import { useEffect } from "react";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({ children }) {
  // Auto-update PWA
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
      </head>

      <body className="min-h-screen bg-[#F7FBFA] antialiased pb-20">
        {children}
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
