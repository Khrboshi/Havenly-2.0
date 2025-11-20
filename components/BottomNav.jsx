"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  SmilePlus,
  BookOpen,
  LineChart,
  User,
  Info,
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Mobile only (client-safe)
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  if (!isMobile) return null;

  const items = [
    { href: "/", icon: Home },
    { href: "/reflect", icon: BookOpen },
    { href: "/mood", icon: SmilePlus },
    { href: "/insights", icon: LineChart },
    { href: "/profile", icon: User },
    { href: "/about", icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 flex justify-around py-3 backdrop-blur-md">
      {items.map(({ href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href}>
            <div
              className={`w-7 h-7 transition ${
                isActive
                  ? "text-brand font-semibold"
                  : "text-brand-dark opacity-50 hover:opacity-80"
              }`}
            >
              <Icon size={26} strokeWidth={2.2} />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
