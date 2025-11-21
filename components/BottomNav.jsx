// components/BottomNav.jsx
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

  const items = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/reflect", icon: BookOpen, label: "Reflect" },
    { href: "/mood", icon: SmilePlus, label: "Mood" },
    { href: "/insights", icon: LineChart, label: "Insights" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/about", icon: Info, label: "About" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 flex justify-around py-3 backdrop-blur-md md:hidden">
      {items.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href} aria-label={label}>
            <div
              className={`w-7 h-7 flex items-center justify-center transition ${
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
