"use client";

import "../globals.css";
import BottomNav from "@/components/BottomNav";
import { Toaster } from "sonner";
import { useEffect } from "react";

export default function MobileLayout({ children }) {
  useEffect(() => {
    // Ensure we removed any old service workers
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => reg.unregister());
      });
    }
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased pb-16">
        {children}
        <BottomNav /> {/* <-- Add it here */}
        <Toaster />
      </body>
    </html>
  );
}
