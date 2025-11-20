"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AuthProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = supabaseBrowser();
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Auth profile error:", error);
        }
        setEmail(data?.user?.email ?? null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <p className="text-sm text-slate-500">Loading profile…</p>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="p-6">
        <p className="text-sm text-slate-600">
          No authenticated user. Please log in first.
        </p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Profile</h1>
      <p className="text-sm text-slate-600">Email: {email}</p>
    </main>
  );
}
