"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function InsightsPage() {
  const supabase = createClientComponentClient();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInsights() {
      const {
        data,
        error
      } = await supabase
        .from("ai_insights")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("INSIGHTS LOAD ERROR:", error);
      } else {
        setInsights(data || []);
      }

      setLoading(false);
    }

    loadInsights();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading insights...</div>;
  }

  if (insights.length === 0) {
    return <div className="p-6 text-slate-500">No insights yet.</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      {insights.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded-xl shadow-sm bg-white"
        >
          <div className="text-xs text-slate-400 mb-2">
            {new Date(item.created_at).toLocaleString()}
          </div>

          <div className="text-slate-800 font-semibold">
            {item.summary}
          </div>

          {item.input_text && (
            <div className="text-slate-500 mt-2 text-sm">
              <span className="font-medium text-slate-700">Reflection:</span>{" "}
              {item.input_text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
