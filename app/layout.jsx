"use client";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />

        {/* PWA metadata */}
        <meta name="theme-color" content="#0D7A7E" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>

      <body className={cn("min-h-screen bg-background antialiased pb-16")}>
        {children}
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
