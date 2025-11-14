"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Mood", href: "/mood" },
    { name: "Journal", href: "/journal" },
    { name: "Insights", href: "/insights" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex justify-around py-2 z-50">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium px-3 py-2 rounded-full transition ${
              active ? "text-primary font-semibold" : "text-gray-500"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
