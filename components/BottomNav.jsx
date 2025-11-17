"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, LineChart, SmilePlus, Info, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Home", icon: <Home size={22} /> },
    { href: "/reflect", label: "Reflect", icon: <BookOpen size={22} /> },
    { href: "/mood", label: "Mood", icon: <SmilePlus size={22} /> },
    { href: "/insights", label: "Insights", icon: <LineChart size={22} /> },
    { href: "/about", label: "About", icon: <Info size={22} /> },
    { href: "/auth/profile", label: "Profile", icon: <User size={22} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 flex justify-around py-2">
      {items.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-[11px]"
          >
            <div className={active ? "text-teal-600" : "text-slate-500"}>
              {item.icon}
            </div>
            <span
              className={
                active ? "text-teal-600 font-medium" : "text-slate-500"
              }
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
