"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { getCurrentUser } from "../../../lib/session";

export default function AchievementsPage() {
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    async function load() {
      const u = await getCurrentUser();
      setUser(u);

      if (!u) return;

      const { data } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", u.id)
        .order("unlocked_at", { ascending: false });

      setAchievements(data || []);
    }

    load();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-5 space-y-6">

      <h1 className="text-2xl font-semibold">Achievements</h1>

      {achievements.length === 0 && (
        <p className="text-gray-500">No achievements yet — keep building your streak!</p>
      )}

      <ul className="space-y-4">
        {achievements.map(a => (
          <li key={a.id} className="border p-3 rounded shadow bg-white">
            <p className="font-bold">🎉 {a.title}</p>
            <p className="text-sm text-gray-600">{a.description}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(a.unlocked_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
