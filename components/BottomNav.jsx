"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const nav = [
    { href: "/dashboard", label: "Home" },
    { href: "/reflect", label: "Reflect" },
    { href: "/mood", label: "Mood" },
    { href: "/insights", label: "Insights" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t py-3 flex justify-around text-sm z-50">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            pathname === item.href
              ? "text-black font-semibold"
              : "text-gray-500"
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
