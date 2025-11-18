"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function JournalPage() {
  const supabase = supabaseBrowser();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("journal").select("*").order("created_at", { ascending: false });
      setEntries(data || []);
    }
    load();
  }, [supabase]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Journal</h1>

      {entries.length === 0 && (
        <p className="text-slate-500 text-sm">No entries yet.</p>
      )}

      <ul className="space-y-3">
        {entries.map((item) => (
          <li key={item.id} className="p-4 border rounded-xl">
            <p className="text-sm text-slate-600">{item.entry}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
