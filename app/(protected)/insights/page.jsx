"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function InsightsPage() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        window.location.href = "/auth/login";
        return;
      }

      const { data, error } = await supabase
        .from("reflections")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setReflections(data);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Insights</h1>

      {loading && <p>Loading...</p>}

      {!loading && reflections.length === 0 && (
        <p className="text-slate-500">No insights yet.</p>
      )}

      <ul className="space-y-4">
        {reflections.map((item) => (
          <li key={item.id} className="p-4 border rounded-xl bg-white shadow-sm">
            <p className="text-sm text-slate-600">{item.summary}</p>
            <p className="text-xs text-slate-400 mt-2">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
