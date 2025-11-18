"use client";

import { isPremiumEnabled } from "@/modules/premium/services";

export default function PremiumNudge() {
  // If premium is enabled, hide the nudge
  if (isPremiumEnabled()) return null;

  return (
    <div className="bg-[#FFF8E6] border border-yellow-300 rounded-lg p-4 shadow-sm mt-8">
      <p className="text-sm text-yellow-800 font-medium">
        Unlock AI-powered insights, advanced mood forecasting, and more with Havenly Premium.
      </p>
    </div>
  );
}
