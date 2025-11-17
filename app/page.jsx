"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [user, setUser] = useState(null);

  // Detect logged-in user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);

      // Auto-redirect logged-in users to dashboard
      if (data.user) {
        window.location.href = "/dashboard";
      }
    });
  }, []);

  // While checking auth
  if (user === undefined) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center pb-24">
      {/* Branding */}
      <h1 className="text-4xl font-semibold mb-4">
        Welcome to <span className="text-teal-600">Havenly</span>
      </h1>
      <p className="text-slate-600 max-w-md mb-10 text-lg">
        A calm, private space to reflect, understand your emotions, 
        and build healthier habits — one moment at a time.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link
          href="/auth/signup"
          className="px-6 py-3 rounded-xl bg-teal-600 text-white text-lg font-medium shadow-sm hover:bg-teal-700 transition"
        >
          Get Started — It's Free
        </Link>

        <Link
          href="/auth/login"
          className="px-6 py-3 rounded-xl border text-slate-700 font-medium hover:bg-slate-50 transition"
        >
          Log In
        </Link>

        <Link
          href="/about"
          className="text-slate-500 text-sm hover:text-teal-600 transition"
        >
          Learn More About Havenly
        </Link>
      </div>

      {/* Soft footer */}
      <p className="text-xs text-slate-400 mt-12">
        Built with privacy at its core — your data belongs only to you.
      </p>
    </main>
  );
}
