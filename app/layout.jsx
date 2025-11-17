"use client";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

export const metadata = {
  title: "Havenly",
  description: "Your wellness companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
