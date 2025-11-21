"use client";

import Link from "next/link";
import { useState } from "react";
import { logoutAction } from "@/app/auth/logout/actions";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b px-6 py-4 flex items-center justify-between">
      <Link href="/dashboard" className="text-xl font-bold text-teal-700">
        Havenly
      </Link>

      <div className="hidden md:flex space-x-8">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/mood">Mood</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/profile">Profile</Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="text-red-600 hover:underline ml-4"
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}
