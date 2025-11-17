"use client";

import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    // TEMPORARILY DISABLE SW
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => reg.unregister());
      });
    }
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
