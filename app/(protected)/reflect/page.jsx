"use client";

import { useState, useEffect } from "react";

/** 
 * If prompts.json is present in /data/prompts.json,
 * this fetch will load it automatically.
 */
async function loadQuestion() {
  try {
    const res = await fetch("/prompts.json");
    if (!res.ok) return "What is one thing on your mind today?";
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    }
    return "What is something you want to reflect on today?";
  } catch {
    return "What is one thing on your mind today?";
  }
}

export default function ReflectPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  // Load question on mount
  useEffect(() => {
    async function load() {
      const q = await loadQuestion();
      setQuestion(q);
    }
    load();
  }, []);

  /** Submit reflection */
  async function submitReflection() {
    if (!answer.trim()) {
      setError("Please enter your reflection.");
      return;
    }

    setError(null);
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/reflect", {
        method: "POST",
        body: JSON.stringify({
          question,
          answer: answer.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save reflection.");
      }

      setSaved(true);
      setAnswer("");
    } catch (err) {
      setError(err.message || "Unable to save reflection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <section>
        <h1 className="text-2xl font-bold text-[#0D7A7E]">Reflect</h1>
        <p className="text-sm text-gray-600 mt-1">
          Take a moment to process your thoughts.
        </p>
      </section>

      {/* Question Card */}
      <section className="bg-white border rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700">Today's Question</h3>
        <p className="text-md font-semibold text-gray-800 mt-2 whitespace-pre-line">
          {question || "Loading question…"}
        </p>
      </section>

      {/* Form */}
      <section className="space-y-4">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your reflection here…"
          rows={6}
          className="w-full border p-3 rounded-xl focus:ring-[#0D7A7E]"
        />

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </p>
        )}

        {saved && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-2">
            Reflection saved successfully!
          </p>
        )}

        <button
          onClick={submitReflection}
          disabled={loading}
          className="w-full py-3 bg-[#0D7A7E] text-white rounded-xl font-medium disabled:bg-gray-400"
        >
          {loading ? "Saving…" : "Save Reflection"}
        </button>
      </section>

      {/* Link to Journal */}
      <section className="text-center">
        <a
          href="/journal"
          className="text-[#0D7A7E] font-medium underline"
        >
          View your past reflections →
        </a>
      </section>

    </div>
  );
}
