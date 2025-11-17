"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function InsightsPage() {
  const supabase = createClientComponentClient();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInsights() {
      const { data, error } = await supabase
        .from("ai_insights")
        .select("*")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setInsights(data || []);
      }

      setLoading(false);
    }

    loadInsights();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 pb-24">
      <h1 className="text-2xl font-semibold mb-4">Insights</h1>

      {loading && (
        <p className="text-slate-500">Loading insights...</p>
      )}

      {!loading && insights.length === 0 && (
        <p className="text-slate-500">No insights yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {insights.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-white shadow-sm border animate-fadeIn"
            style={{ animationDelay: "0.05s" }}
          >
            <div className="text-xs text-slate-400 mb-1">
              {new Date(item.created_at).toLocaleString()}
            </div>

            <p className="text-slate-800 leading-relaxed">
              {item.summary}
            </p>

            <p className="text-slate-500 text-sm mt-3">
              <span className="font-medium text-slate-600">Reflection:</span>{" "}
              {item.input_text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
