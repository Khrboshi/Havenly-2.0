"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { getCurrentUser } from "../../../lib/session";

export default function InsightsPage() {
  const [user, setUser] = useState(null);
  const [insights, setInsights] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const u = await getCurrentUser();
      setUser(u);

      if (!u) return;

      const { data } = await supabase
        .from("ai_insights")
        .select("*")
        .eq("user_id", u.id)
        .order("created_at", { ascending: false });

      setInsights(data || []);
    }

    load();
  }, []);

  async function generateInsight() {
    if (!user || input.trim() === "") return;

    setLoading(true);

    const response = await fetch("/api/insights", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
        text: input,
      }),
    });

    const res = await response.json();
    setLoading(false);
    setInput("");

    if (!res.success) {
      alert("AI failed. Try again.");
      return;
    }

    setInsights([res.insight, ...insights]);
  }

  return (
    <div className="max-w-xl mx-auto p-5 pb-24 space-y-6">
      
      <h1 className="text-2xl font-semibold">AI Insights</h1>

      {/* Input Box */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">Get an AI Insight</h2>

        <textarea
          placeholder="Write a reflection for AI to analyze..."
          className="w-full border p-3 rounded mb-3"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={generateInsight}
          disabled={loading}
          className="bg-primary text-white py-2 rounded w-full"
        >
          {loading ? "Analyzing..." : "Generate Insight"}
        </button>
      </div>

      {/* Insights List */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-4">Previous Insights</h2>

        {insights.length === 0 ? (
          <p className="text-gray-500 text-sm">No insights yet.</p>
        ) : (
          <ul className="space-y-4">
            {insights.map((i) => (
              <li key={i.id} className="border p-3 rounded">
                <p className="font-semibold mb-1">Summary:</p>
                <p className="text-sm mb-2">{i.ai_summary}</p>

                <p className="font-semibold mb-1">Recommendation:</p>
                <p className="text-sm">{i.ai_recommendation}</p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(i.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
