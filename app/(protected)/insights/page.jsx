"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function InsightsPage() {
  const supabase = supabaseBrowser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("ai_insights")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setItems(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main className="p-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">Your Insights</h1>

      {loading && <p>Loading…</p>}

      {!loading && items.length === 0 && (
        <p className="text-slate-500">No insights yet.</p>
      )}

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="p-4 bg-white border rounded-xl shadow-sm">
            <p>{item.summary}</p>
            <p className="text-xs text-slate-400 mt-2">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
