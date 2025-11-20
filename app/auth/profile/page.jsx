"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AuthProfilePage() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = supabaseBrowser();
        const { data } = await supabase.auth.getUser();
        setEmail(data?.user?.email ?? null);
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <p className="text-sm text-slate-600">Loading profile…</p>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="p-6">
        <p className="text-sm text-slate-600">
          Not authenticated. Please log in.
        </p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-3">Profile</h1>
      <p className="text-sm text-slate-700">Email: {email}</p>
    </main>
  );
}
