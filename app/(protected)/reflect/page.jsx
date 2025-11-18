"use client";

import { useState } from "react";
import { saveReflection } from "@/modules/reflect/services";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const questions = [
  "What is one thing you are grateful for today?",
  "What challenged you today?",
  "What is one thing you could do tomorrow to feel better?",
];

export default function ReflectPage() {
  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function updateAnswer(index, value) {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  }

  async function submit() {
    const combined = answers.filter((a) => a.trim()).join("\n\n");
    if (!combined.trim()) return;

    setSaving(true);
    setSaved(false);
    setError("");

    const response = await saveReflection(combined);

    if (response?.error) {
      setError("Unable to save your reflections. Please try again.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);

    // Reset fields
    setAnswers(questions.map(() => ""));
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <section>
        <h2 className="text-xl font-semibold text-[#0D7A7E]">Reflect</h2>
        <p className="text-gray-600 text-sm mt-1">
          Take a moment to reflect on your day.
        </p>
      </section>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <p className="text-gray-700 text-sm font-medium mb-2">{q}</p>
            <textarea
              rows={3}
              value={answers[i]}
              onChange={(e) => updateAnswer(i, e.target.value)}
              placeholder="Write your thoughts here…"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D7A7E]"
            />
          </div>
        ))}
      </div>

      <button
        onClick={submit}
        disabled={saving}
        className={`w-full py-3 text-white rounded-lg transition ${
          saving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#0D7A7E] hover:bg-[#096064]"
        }`}
      >
        {saving ? "Saving…" : "Save Reflections"}
      </button>

      {saved && (
        <p className="text-green-600 text-center text-sm mt-3">
          Your reflections have been saved.
        </p>
      )}

      {error && (
        <p className="text-red-600 text-center text-sm mt-3">{error}</p>
      )}
    </motion.div>
  );
}
