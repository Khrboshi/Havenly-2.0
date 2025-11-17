"use client";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import BottomNav from "@/components/BottomNav";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
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

      <body className={cn("min-h-screen bg-background antialiased pb-16")}>
        {children}
        <BottomNav />   {/* <-- Always visible */}
        <Toaster />
      </body>
    </html>
  );
}
