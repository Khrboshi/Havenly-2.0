"use client";

import { useState } from "react";

const moods = [
  { emoji: "😄", label: "Great" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😕", label: "Low" },
  { emoji: "😢", label: "Sad" },
];

export default function MoodPage() {
  const [selected, setSelected] = useState(null);

  return (
    <main className="p-6 pb-28 text-center">
      <h1 className="text-2xl font-semibold mb-4">How do you feel today?</h1>

      <div className="flex justify-center gap-5 mt-8">
        {moods.map((m, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(m.label)}
            className={`text-4xl transition ${
              selected === m.label ? "scale-125" : "opacity-70"
            }`}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      {selected && (
        <p className="mt-6 text-lg text-slate-700">
          You're feeling <span className="font-medium">{selected}</span>
        </p>
      )}
    </main>
  );
}
