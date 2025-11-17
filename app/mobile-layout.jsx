"use client";

import ForceReload from "@/app/force-reload";

export default function MobileLayout({ children }) {
  return (
    <div className="mobile-layout">
      {/* 🚀 Ensure mobile PWA also refreshes */}
      <ForceReload />
      {children}
    </div>
  );
}
