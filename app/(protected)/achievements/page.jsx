"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AchievementsPage() {
  const supabase = supabaseBrowser();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", user.id);

      setItems(data || []);
    }

    load();
  }, []);

  return (
    <main className="p-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>

      <ul className="space-y-3">
        {items.map((a) => (
          <li key={a.id} className="p-4 border rounded-xl bg-white shadow-sm">
            {a.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
