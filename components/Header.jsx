"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "";

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/mood", label: "Mood" },
    { href: "/journal", label: "Journal" },
    { href: "/reflect", label: "Reflect" },
    { href: "/insights", label: "Insights" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="w-full border-b bg-white border-gray-200 py-3 px-5">
      <nav className="flex items-center justify-between max-w-2xl mx-auto">
        <h1 className="font-semibold text-[#0D7A7E]">
          Havenly
        </h1>

        <ul className="flex gap-4 text-sm">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition ${
                    isActive
                      ? "text-[#0D7A7E] font-medium"
                      : "text-gray-600 hover:text-[#0D7A7E]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
