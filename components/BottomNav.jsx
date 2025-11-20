"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, SmilePlus, BookOpen, LineChart, User, Info } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (!isMobile) return null;

  const items = [
    { href: "/", icon: <Home size={22} /> },
    { href: "/reflect", icon: <BookOpen size={22} /> },
    { href: "/mood", icon: <SmilePlus size={22} /> },
    { href: "/insights", icon: <LineChart size={22} /> },
    { href: "/auth/profile", icon: <User size={22} /> },
    { href: "/about", icon: <Info size={22} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 flex justify-around py-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <div className={pathname === item.href ? "text-teal-600" : "text-slate-500"}>
            {item.icon}
          </div>
        </Link>
      ))}
    </nav>
  );
}
className={`w-7 h-7 ${
  isActive ? "text-brand" : "text-brand-dark opacity-60"
}`}
