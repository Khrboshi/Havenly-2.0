"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  PenLine, 
  Smile, 
  BarChart3, 
  User 
} from "lucide-react";

const tabs = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/reflect", icon: PenLine, label: "Reflect" },
  { href: "/mood", icon: Smile, label: "Mood" },
  { href: "/insights", icon: BarChart3, label: "Insights" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md h-16 flex justify-around items-center z-50 px-2">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center text-xs"
          >
            <Icon
              size={22}
              className={active ? "text-primary" : "text-gray-400"}
            />
            <span className={active ? "text-primary" : "text-gray-400"}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
