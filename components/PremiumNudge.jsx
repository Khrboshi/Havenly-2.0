"use client";

import Link from "next/link";

export default function PremiumNudge() {
  return (
    <div className="bg-[#E6F4F3] border border-[#CDE7E5] rounded-lg p-4 mt-6">
      <h3 className="text-[#0D7A7E] font-semibold mb-2">
        Upgrade your emotional journey
      </h3>
      <p className="text-sm text-gray-600">
        Unlock premium insights, unlimited journaling, and deeper reflection tools.
      </p>

      <Link
        href="/profile"
        className="inline-block mt-3 px-4 py-2 bg-[#0D7A7E] text-white rounded-md text-sm"
      >
        Learn More
      </Link>
    </div>
  );
}
