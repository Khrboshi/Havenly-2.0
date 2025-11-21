"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  // Hide header on small screens where BottomNav is used
  if (isMobile) return null;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/reflect", label: "Reflect" },
    { href: "/mood", label: "Mood" },
    { href: "/insights", label: "Insights" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* BRAND / LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-brand-dark"
        >
          Havenly
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`font-medium transition ${
                  isActive
                    ? "text-brand underline underline-offset-4 decoration-2"
                    : "text-slate-600 hover:text-brand-dark"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* PROFILE ICON */}
        <Link
          href="/profile"
          className="text-brand-dark hover:text-brand transition"
        >
          <User size={26} strokeWidth={2.2} />
        </Link>
      </div>
    </header>
  );
}
