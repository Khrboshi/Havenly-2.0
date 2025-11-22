"use client";

export const dynamic = "force-dynamic";

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

  async function save() {
    if (!selectedMood) return;

    setSaving(true);
    setSaved(false);

    const response = await saveMood(selectedMood);

    setSaving(false);

    if (!response?.error) {
      setSelectedMood(null);
      setSaved(true);
    }
  }

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="show" className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-[#0D7A7E]">How are you feeling?</h2>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`p-4 rounded-lg border shadow-sm text-left ${
              selectedMood === mood.value ? "border-[#0D7A7E] bg-[#E6F4F3]" : "border-gray-200 bg-white"
            }`}
          >
            <span className="text-xl">{mood.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={save}
        disabled={!selectedMood || saving}
        className="w-full py-3 bg-[#0D7A7E] text-white rounded-lg"
      >
        {saving ? "Saving…" : "Save Mood"}
      </button>

      {saved && <p className="text-green-600 text-center text-sm">Mood saved!</p>}
    </motion.div>
  );
}
