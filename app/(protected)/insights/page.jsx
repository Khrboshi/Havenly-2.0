"use client";

import { useState } from "react";

export default function InsightsPage() {
  const [input, setInput] = useState("");
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /** Request AI insight */
  async function getInsight() {
    if (!input.trim()) {
      setError("Please enter a thought or reflection.");
      return;
    }

    setLoading(true);
    setError(null);
    setInsight(null);

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        throw new Error("Unable to generate insight.");
      }

      const data = await res.json();
      setInsight(data.insight || "No insight returned.");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <section>
        <h1 className="text-2xl font-bold text-[#0D7A7E]">AI Insights</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter a thought or reflection and receive a personalized interpretation.
        </p>
      </section>

      {/* Input */}
      <section className="space-y-4">
        <textarea
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your reflection or emotional note here…"
          className="w-full border p-3 rounded-xl focus:ring-[#0D7A7E]"
        />

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </p>
        )}

        <button
          onClick={getInsight}
          disabled={loading}
          className="w-full py-3 bg-[#0D7A7E] text-white rounded-xl font-medium disabled:bg-gray-400"
        >
          {loading ? "Analyzing…" : "Generate Insight"}
        </button>
      </section>

      {/* Output */}
      <section>
        {loading && (
          <div className="bg-white border rounded-xl p-4 shadow-sm animate-pulse">
            <p className="text-sm text-gray-600">Thinking…</p>
          </div>
        )}

        {insight && (
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Your Insight</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{insight}</p>
          </div>
        )}
      </section>

      {/* Link to Reflect */}
      <section className="text-center">
        <a href="/reflect" className="text-[#0D7A7E] font-medium underline">
          Or write a new reflection →
        </a>
      </section>

    </div>
  );
}
