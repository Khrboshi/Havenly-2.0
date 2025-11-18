"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ProfilePage() {
  const supabase = supabaseBrowser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    load();
  }, [supabase]);

  if (!user) return <p>Loading…</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-4 text-sm text-slate-600">Email: {user.email}</p>
    </main>
  );
}
