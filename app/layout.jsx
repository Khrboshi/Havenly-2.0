"use client";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { useEffect } from "react";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({ children }) {
  // Register service worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#0D7A7E" />

        {/* iOS PWA support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
      </head>

      <body className={cn("min-h-screen bg-background antialiased pb-20")}>
        {/* Page content */}
        {children}

        {/* Toast notifications */}
        <Toaster />

        {/* Bottom Navigation */}
        <BottomNav />
      </body>
    </html>
  );
}
