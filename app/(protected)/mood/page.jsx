"use client";

import { useState } from "react";

export default function MoodPage() {
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  async function submitMood() {
    if (!mood) {
      setError("Please select a mood.");
      return;
    }

    setLoading(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        body: JSON.stringify({ mood }),
      });

      if (!res.ok) {
        throw new Error("Failed to save mood.");
      }

      setSaved(true);
    } catch (err) {
      setError(err.message || "Unable to save mood.");
    } finally {
      setLoading(false);
    }
  }

  const moods = [
    { label: "Great", value: "great", emoji: "😄" },
    { label: "Good", value: "good", emoji: "🙂" },
    { label: "Okay", value: "okay", emoji: "😐" },
    { label: "Bad", value: "bad", emoji: "😞" },
    { label: "Terrible", value: "terrible", emoji: "😣" },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <section>
        <h1 className="text-2xl font-bold text-[#0D7A7E]">Log Your Mood</h1>
        <p className="text-sm text-gray-600 mt-1">
          Select how you're feeling today.
        </p>
      </section>

      {/* Mood Options */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {moods.map((m) => (
          <button
            key={m.value}
            onClick={() => setMood(m.value)}
            className={`flex flex-col items-center justify-center border rounded-xl py-4 shadow-sm transition ${
              mood === m.value
                ? "bg-[#0D7A7E] text-white border-[#0D7A7E]"
                : "bg-white text-gray-700 hover:bg-[#F1F7F6]"
            }`}
          >
            <span className="text-3xl mb-1">{m.emoji}</span>
            <span className="text-sm font-medium">{m.label}</span>
          </button>
        ))}
      </section>

      {/* Status Messages */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
          {error}
        </p>
      )}

      {saved && (
        <p className="text-sm text-green-700 bg-green-50 p-2 rounded-md border border-green-200">
          Mood saved successfully!
        </p>
      )}

      {/* Submit Button */}
      <button
        onClick={submitMood}
        disabled={loading}
        className="w-full py-3 bg-[#0D7A7E] text-white rounded-xl font-medium disabled:bg-gray-400"
      >
        {loading ? "Saving…" : "Save Mood"}
      </button>
    </div>
  );
}
