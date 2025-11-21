"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/journal">Journal</Link>
      <Link href="/mood">Mood</Link>
      <Link href="/insights">Insights</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
}
