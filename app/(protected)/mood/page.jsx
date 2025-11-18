"use client";

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function MoodPage() {
  const supabase = supabaseBrowser();
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("moods")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setMoods(data || []);
    }
    load();
  }, []);

  return (
    <main className="p-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">Your Mood History</h1>

      <ul className="space-y-3">
        {moods.map(m => (
          <li key={m.id} className="p-4 border rounded-lg">
            <div>{m.mood}</div>
            <div className="text-xs text-slate-500">
              {new Date(m.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
