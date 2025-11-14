"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  LineChart,
  Smile,
  User
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/reflect", label: "Reflect", icon: BookOpen },
    { href: "/insights", label: "Insights", icon: LineChart },
    { href: "/mood", label: "Mood", icon: Smile },
    { href: "/profile", label: "Profile", icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg px-4 py-2 flex justify-between max-w-md mx-auto right-0 z-50">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center flex-1"
          >
            <Icon
              size={22}
              className={active ? "text-primary" : "text-slate-400"}
            />
            <span
              className={`text-xs ${
                active ? "text-primary font-medium" : "text-slate-400"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
