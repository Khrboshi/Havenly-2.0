import "./globals.css";
import { cn } from "@/lib/utils";
"use client";
import { Toaster } from "sonner";

export const metadata = {
  title: "Havenly",
  description: "Mindful reflection made simple.",
};

// Required for mobile-app styling
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-background">
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background text-foreground",
          "antialiased",
          "pt-safe pb-safe"
        )}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
