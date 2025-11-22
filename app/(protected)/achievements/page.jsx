// app/(protected)/achievements/page.jsx
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AchievementsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = supabaseBrowser();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setItems([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("achievements")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Achievements load error:", error);
          setItems([]);
        } else {
          setItems(data || []);
        }
      } catch (e) {
        console.error("Achievements load error:", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <main className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-[#0D7A7E]">Achievements</h1>
        <p className="text-gray-600 text-sm mt-1">
          Milestones you have unlocked through consistent check-ins and
          reflections.
        </p>
      </header>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading your achievements…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No achievements yet. As you keep logging moods and writing, new
          milestones will appear here.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((a) => (
            <li
              key={a.id}
              className="p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800">{a.title}</p>
                {a.description && (
                  <p className="text-gray-500 text-xs mt-1">
                    {a.description}
                  </p>
                )}
              </div>
              {a.created_at && (
                <span className="text-xs text-gray-400">
                  {new Date(a.created_at).toLocaleDateString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
