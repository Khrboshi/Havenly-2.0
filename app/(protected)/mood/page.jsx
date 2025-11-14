"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { getCurrentUser } from "../../../lib/session";
import MoodChart from "../../../components/MoodChart";

export default function MoodPage() {
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    async function loadData() {
      const u = await getCurrentUser();
      setUser(u);

      if (!u) return;

      const { data } = await supabase
        .from("moods")
        .select("*")
        .eq("user_id", u.id)
        .order("created_at", { ascending: true });

      setMoods(data || []);
    }

    loadData();
  }, []);

  async function submitMood() {
    if (!user) return;

    await supabase.from("moods").insert({
      user_id: user.id,
      mood_value: mood,
      note: note || null,
    });

    setNote("");

    // Refresh the list
    const { data } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    setMoods(data || []);

    alert("Mood saved!");
  }

  return (
    <div className="max-w-xl mx-auto p-5 pb-24 space-y-6">

      <h1 className="text-2xl font-semibold">Mood Tracker</h1>

      {/* Mood Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">Mood Over Time</h2>
        {moods.length > 0 ? (
          <MoodChart moods={moods} />
        ) : (
          <p className="text-sm text-gray-500">No mood data yet.</p>
        )}
      </div>

      {/* Add Mood */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">How do you feel?</h2>

        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full"
        />
        <p className="text-center mt-2">Mood: {mood}/10</p>

        <textarea
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-2 rounded mt-3"
        />

        <button
          onClick={submitMood}
          className="mt-3 bg-primary text-white px-4 py-2 rounded w-full"
        >
          Save Mood
        </button>
      </div>

      {/* Mood History */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">Mood History</h2>

        {moods.length === 0 && (
          <p className="text-sm text-gray-500">No previous entries.</p>
        )}

        <ul className="space-y-2">
          {moods.map((m) => (
            <li key={m.id} className="flex justify-between text-sm border p-2 rounded">
              <span>Mood: {m.mood_value}/10</span>
              <span>{new Date(m.created_at).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
