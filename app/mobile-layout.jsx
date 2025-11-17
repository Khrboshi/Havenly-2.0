"use client";

import "../globals.css";
import BottomNav from "@/components/BottomNav";
import { Toaster } from "sonner";
import { useEffect } from "react";

export default function MobileLayout({ children }) {
  useEffect(() => {
    // Remove old service workers on mobile
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
    }
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased pb-20">
        <main>{children}</main>
        <BottomNav /> {/* Bottom bar always visible on mobile */}
        <Toaster />
      </body>
    </html>
  );
}
