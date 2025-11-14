"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { getCurrentUser } from "../../../lib/session";
import Link from "next/link";

export default function JournalPage() {
  const [user, setUser] = useState(null);
  const [reflections, setReflections] = useState([]);
  const [newReflection, setNewReflection] = useState("");

  useEffect(() => {
    async function load() {
      const u = await getCurrentUser();
      setUser(u);

      if (!u) return;

      const { data } = await supabase
        .from("reflections")
        .select("*")
        .eq("user_id", u.id)
        .order("created_at", { ascending: false });

      setReflections(data || []);
    }

    load();
  }, []);

  // Add reflection
  async function addReflection() {
    if (!user || newReflection.trim() === "") return;

    const { data, error } = await supabase
      .from("reflections")
      .insert({
        user_id: user.id,
        content: newReflection,
      })
      .select();

    if (error) {
      console.error(error);
      return;
    }

    setReflections([data[0], ...reflections]); // add to top
    setNewReflection("");
  }

  // Delete reflection
  async function deleteReflection(id) {
    await supabase.from("reflections").delete().eq("id", id);
    setReflections(reflections.filter((r) => r.id !== id));
  }

  return (
    <div className="max-w-xl mx-auto p-5 pb-24 space-y-6">

      <h1 className="text-2xl font-semibold">Journal</h1>

      {/* Add reflection */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">Write a reflection</h2>
        <textarea
          className="w-full border rounded p-3"
          rows="3"
          placeholder="Write what's on your mind..."
          value={newReflection}
          onChange={(e) => setNewReflection(e.target.value)}
        />
        <button
          onClick={addReflection}
          className="mt-3 bg-primary text-white w-full py-2 rounded"
        >
          Add Reflection
        </button>
      </div>

      {/* Reflections list */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium text-lg mb-2">Your Entries</h2>

        {reflections.length === 0 && (
          <p className="text-sm text-gray-500">No reflections yet.</p>
        )}

        <ul className="space-y-3">
          {reflections.map((r) => (
            <li
              key={r.id}
              className="border p-3 rounded flex items-start justify-between"
            >
              <div className="w-[80%]">
                <p className="text-sm">{r.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => deleteReflection(r.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
