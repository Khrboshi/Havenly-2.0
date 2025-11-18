"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Mood", href: "/mood" },
    { name: "Journal", href: "/journal" },
    { name: "Reflect", href: "/reflect" },
    { name: "Insights", href: "/insights" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-xl font-semibold text-[#0D7A7E]">
          Havenly
        </Link>

        <nav className="flex gap-6 text-sm text-gray-700">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-[#0D7A7E] font-semibold"
                  : "hover:text-[#0D7A7E]"
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
