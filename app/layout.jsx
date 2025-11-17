"use client";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
