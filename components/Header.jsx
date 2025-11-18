"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Mood", href: "/mood" },
  { name: "Journal", href: "/journal" },
  { name: "Reflect", href: "/reflect" },
  { name: "Insights", href: "/insights" },
  { name: "Profile", href: "/profile" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard">
          <h1 className="text-xl font-semibold text-[#0D7A7E] tracking-tight">
            Havenly
          </h1>
        </Link>

        <nav className="flex gap-4 text-sm font-medium text-gray-600">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-[#0D7A7E] transition ${
                  active ? "text-[#0D7A7E] font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
