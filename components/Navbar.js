"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Journal", href: "/journal" },
    { name: "Mood", href: "/mood" },
    { name: "Insights", href: "/insights" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="text-xl font-bold text-teal-700">
          Havenly
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  active ? "text-teal-700" : "text-gray-600 hover:text-teal-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
