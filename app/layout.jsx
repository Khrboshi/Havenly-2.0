"use client";

import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    // Detect mobile using multiple signals
    const mobileCheck =
      window.innerWidth <= 768 ||
      navigator.maxTouchPoints > 1 ||
      /Mobi|Android|iPhone/i.test(navigator.userAgent);

    setIsMobile(mobileCheck);

    // Remove old PWA service workers (fix old UI caching)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
    }
  }, []);

  // SSR initial pass → avoid hydration mismatch
  if (isMobile === null) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-background" />
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`min-h-screen bg-background ${isMobile ? "pb-20" : ""}`}>
        <main>{children}</main>

        {/* Mobile ONLY shows BottomNav */}
        {isMobile && <BottomNav />}

        <Toaster />
      </body>
    </html>
  );
}
