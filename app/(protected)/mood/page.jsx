"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function MoodPage() {
  const moods = ["😄", "🙂", "😐", "😕", "😢"];
  const labels = ["Great", "Good", "Okay", "Low", "Sad"];
  const [selected, setSelected] = useState(null);

  const saveMood = async (moodLabel) => {
    setSelected(moodLabel);

    const session = await supabase.auth.getSession();
    const user = session.data.session?.user;

    if (!user) return;

    await supabase.from("mood_entries").insert({
      user_id: user.id,
      mood: moodLabel
    });
  };

  return (
    <main className="p-6 pb-28 text-center">
      <h1 className="text-2xl font-semibold mb-4">How do you feel today?</h1>

      <div className="flex justify-center gap-5 mt-8">
        {moods.map((emoji, idx) => (
          <button
            key={emoji}
            onClick={() => saveMood(labels[idx])}
            className="text-4xl opacity-70 transition hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>

      {selected && (
        <p className="mt-6 text-lg text-slate-700">
          Saved: <span className="font-medium">{selected}</span>
        </p>
      )}
    </main>
  );
}
