"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { getCurrentUser } from "../../../lib/session";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");
  const [reflection, setReflection] = useState("");
  const [reflections, setReflections] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    async function loadData() {
      const u = await getCurrentUser();
      setUser(u);

      if (!u) return;

      // Load reflections
      const { data: reflectionsData } = await supabase
        .from("reflections")
        .select("*")
        .eq("user_id", u.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setReflections(reflectionsData || []);

      // Load mood history
      const { data: moodData } = await supabase
        .from("moods")
        .select("*")
        .eq("user_id", u.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setMoodHistory(moodData || []);
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
    alert("Mood saved!");
  }

  async function submitReflection() {
    if (!user) return;

    await supabase.from("reflections").insert({
      user_id: user.id,
      content: reflection,
    });

    setReflection("");
    alert("Reflection saved!");
  }

  return (
    <div className="max-w-xl mx-auto p-5 space-y-6">
      
      {/* Greeting */}
      <h1 className="text-2xl font-semibold">
        Welcome back{user ? ", " + (user.email || "") : ""} 👋
      </h1>

      {/* Quick Mood Tracker */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">How are you feeling today?</h2>

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

      {/* Reflection */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">Write a reflection</h2>
        <textarea
          placeholder="Write your thoughts..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        />
        <button
          onClick={submitReflection}
          className="mt-3 bg-primary text-white px-4 py-2 rounded w-full"
        >
          Save Reflection
        </button>
      </div>

      {/* Recent Reflections */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">Recent Reflections</h2>

        {reflections.length === 0 && (
          <p className="text-sm text-gray-500">No reflections yet.</p>
        )}

        <ul className="space-y-3">
          {reflections.map((r) => (
            <li key={r.id} className="border p-3 rounded">
              <p className="text-sm">{r.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(r.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Mood History */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">Mood History</h2>

        {moodHistory.length === 0 && (
          <p className="text-sm text-gray-500">No data yet.</p>
        )}

        <ul className="space-y-1">
          {moodHistory.map((m) => (
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
