"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Home, BookOpen, LineChart, SmilePlus, Info } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  // Detect login state
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // Show only About if user is NOT logged in
  if (!user) {
    return (
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 flex justify-around py-2">
        <Link
          href="/about"
          className="flex flex-col items-center text-[11px] text-slate-500"
        >
          <Info size={22} />
          <span>About</span>
        </Link>
      </nav>
    );
  }

  // Full nav when logged in
  const items = [
    { href: "/dashboard", label: "Home", icon: <Home size={22} /> },
    { href: "/reflect", label: "Reflect", icon: <BookOpen size={22} /> },
    { href: "/mood", label: "Mood", icon: <SmilePlus size={22} /> },
    { href: "/insights", label: "Insights", icon: <LineChart size={22} /> },
    { href: "/about", label: "About", icon: <Info size={22} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 flex justify-around py-2">
      {items.map((item) => {
        const active = pathname === item.href;

        return (
          <Link key={item.href} href={item.href}>
            <div className="flex flex-col items-center text-[11px]">
              <div className={active ? "text-teal-600" : "text-slate-500"}>
                {item.icon}
              </div>
              <span
                className={active ? "text-teal-600 font-medium" : "text-slate-500"}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
