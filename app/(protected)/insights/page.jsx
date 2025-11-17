"use client";

import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        window.location.href = "/auth/login";
        return;
      }

      const { data } = await supabase
        .from("ai_insights")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setInsights(data || []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6 pb-28">
      <h1 className="text-2xl font-semibold mb-4">Insights</h1>

      <div className="grid gap-4">
        {insights.map((insight) => (
          <div key={insight.id} className="p-4 bg-white border rounded-xl shadow">
            <p className="font-semibold mb-1">{insight.ai_summary}</p>
            <p className="text-sm text-gray-600">{insight.ai_recommendation}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(insight.created_at).toLocaleString()}
            </p>
          </div>
        ))}

        {insights.length === 0 && (
          <p className="text-gray-500">No insights yet.</p>
        )}
      </div>
    </main>
  );
}
