// app/(protected)/mood/page.jsx
"use client";

import { useState } from "react";
import { saveMood } from "@/modules/mood/services";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const moodOptions = [
  { value: 1, label: "😞 Very Low" },
  { value: 2, label: "😒 Low" },
  { value: 3, label: "😐 Neutral" },
  { value: 4, label: "🙂 Good" },
  { value: 5, label: "😄 Great" },
];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!selectedMood) return;

    setSaving(true);
    setSaved(false);
    setError("");

    const response = await saveMood(selectedMood);

    if (response?.error) {
      setError("Unable to save mood. Please try again.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);
    setSelectedMood(null);
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <section>
        <h2 className="text-xl font-semibold text-[#0D7A7E]">
          How are you feeling today?
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Select the option that best represents your current emotional state.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {moodOptions.map((mood) => {
          const active = selectedMood === mood.value;
          return (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              disabled={saving}
              className={`p-4 rounded-lg border shadow-sm text-left transition ${
                active
                  ? "border-[#0D7A7E] bg-[#E6F4F3]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="text-xl">{mood.label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={save}
        disabled={!selectedMood || saving}
        className={`w-full py-3 text-white rounded-lg transition ${
          !selectedMood || saving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#0D7A7E] hover:bg-[#096064]"
        }`}
      >
        {saving ? "Saving…" : "Save Mood"}
      </button>

      {saved && (
        <p className="text-green-600 text-center text-sm mt-3">
          Your mood has been saved!
        </p>
      )}

      {error && (
        <p className="text-red-600 text-center text-sm mt-3">{error}</p>
      )}
    </motion.div>
  );
}
