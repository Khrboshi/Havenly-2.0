"use client";

import { useState } from "react";
import { saveJournal } from "@/modules/journal/services";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!entry.trim()) return;

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const success = await saveJournal(entry.trim());
      if (!success) throw new Error("Failed to save entry.");

      setEntry("");
      setSaved(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <section>
        <h2 className="text-xl font-semibold text-[#0D7A7E]">Journal</h2>
        <p className="text-gray-600 text-sm mt-1">
          Write your thoughts, feelings, or anything on your mind.
        </p>
      </section>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Start writing here..."
        rows={6}
        className="w-full p-4 rounded-lg border border-gray-300 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-[#0D7A7E] transition"
      />

      <button
        onClick={save}
        disabled={!entry.trim() || saving}
        className={`w-full py-3 text-white rounded-lg transition ${
          !entry.trim() || saving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#0D7A7E] hover:bg-[#096064]"
        }`}
      >
        {saving ? "Saving…" : "Save Entry"}
      </button>

      {saved && (
        <p className="text-green-600 text-center text-sm mt-3">
          Your journal entry has been saved.
        </p>
      )}

      {error && (
        <p className="text-red-600 text-center text-sm mt-3">{error}</p>
      )}
    </motion.div>
  );
}
