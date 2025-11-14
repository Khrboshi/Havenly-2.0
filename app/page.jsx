"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center bg-gradient-to-b from-blue-50 to-white">

      <h1 className="text-4xl font-semibold text-slate-800 mb-6 leading-snug">
        Welcome to <span className="text-primary">Havenly</span> 2.0
      </h1>

      <p className="text-slate-600 max-w-md mb-8">
        A mobile-first, AI-guided reflection space.  
        Calm. Private. Cloud-synced.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link href="/reflect" className="btn-primary">
          Start Reflecting
        </Link>
        <Link href="/progress" className="btn-secondary">
          View Progress
        </Link>
        <Link href="/auth/login" className="text-slate-500 text-sm hover:text-primary">
          Log in
        </Link>
        <Link href="/auth/signup" className="text-slate-500 text-sm hover:text-primary">
          Create an account
        </Link>
      </div>

    </main>
  );
}
