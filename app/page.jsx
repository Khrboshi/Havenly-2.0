"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    }
    load();
  }, []);

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

        {/* Logged-in user */}
        {user && (
          <Link href="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        )}

        {/* Logged-out user */}
        {!user && (
          <>
            <Link href="/auth/login" className="btn-primary">
              Log in
            </Link>
            <Link href="/auth/signup" className="btn-secondary">
              Create an account
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
