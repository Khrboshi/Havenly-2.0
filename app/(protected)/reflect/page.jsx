"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ReflectPage() {
  const supabase = createClientComponentClient();

  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");

  async function handleSubmit() {
    if (!reflection.trim()) return;

    setLoading(true);
    setInsight("");

    const {
      data: { user }
    } = await supabase.auth.getUser();

    // 1) SAVE reflection
    const { error: reflectionError } = await supabase.from("reflections").insert({
      user_id: user.id,
      content: reflection,
      mood: null
    });

    if (reflectionError) {
      setInsight("Error saving reflection.");
      setLoading(false);
      return;
    }

    // 2) GET AI Insight from your API
    const ai = await fetch("/api/ai-insight", {
      method: "POST",
      body: JSON.stringify({ text: reflection })
    });

    const aiData = await ai.json();

    if (!ai.ok) {
      setInsight("Could not generate AI insight.");
      setLoading(false);
      return;
    }

    setInsight(aiData.summary);

    // 3) SAVE AI Insight
    await supabase.from("ai_insights").insert({
      user_id: user.id,
      summary: aiData.summary,
      input_text: reflection
    });

    // 4) UPDATE STREAK
    await fetch("/api/update-streak", { method: "POST" });

    setLoading(false);
    setReflection("");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 pb-24">
      <h1 className="text-2xl font-semibold mb-4">Daily Reflection</h1>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        className="w-full p-4 rounded-xl border shadow-sm focus:ring focus:ring-primary/20"
        rows={6}
        placeholder="What's on your mind?"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-medium disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit Reflection"}
      </button>

      {insight && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border animate-fadeIn">
          <h2 className="font-semibold mb-2">AI Insight</h2>
          <p className="text-slate-700">{insight}</p>
        </div>
      )}
    </div>
  );
}
