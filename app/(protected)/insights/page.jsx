"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function InsightsPage() {
  const [moodHistory, setMoodHistory] = useState([]);
  const [journalCount, setJournalCount] = useState(0);
  const [reflectionCount, setReflectionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInsights() {
      try {
        // Fetch recent mood entries
        const { data: moods } = await supabase
          .from("moods")
          .select("score, created_at")
          .order("created_at", { ascending: true })
          .limit(30); // last 30 moods

        // Journal count
        const { count: journalEntries } = await supabase
          .from("journal")
          .select("*", { count: "exact", head: true });

        // Reflection count
        const { count: reflectionEntries } = await supabase
          .from("reflections")
          .select("*", { count: "exact", head: true });

        setMoodHistory(moods || []);
        setJournalCount(journalEntries || 0);
        setReflectionCount(reflectionEntries || 0);
      } catch (e) {
        console.error("Insights load error:", e);
      } finally {
        setLoading(false);
      }
    }

    loadInsights();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-600 animate-pulse">
        Loading insights…
      </div>
    );
  }

  const avgMood =
    moodHistory.length > 0
      ? (moodHistory.reduce((a, b) => a + b.score, 0) / moodHistory.length).toFixed(1)
      : "–";

  const lastMood = moodHistory[moodHistory.length - 1]?.score || null;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <section>
        <h2 className="text-xl font-semibold text-[#0D7A7E]">Insights</h2>
        <p className="text-gray-600 text-sm mt-1">
          A quick look at your recent emotional trends.
        </p>
      </section>

      <div className="space-y-4">
        {/* Average mood */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Average Mood (Last 30 entries)</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">{avgMood}</p>
        </div>

        {/* Last mood */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Most Recent Mood</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">
            {lastMood !== null ? lastMood : "–"}
          </p>
        </div>

        {/* Journal count */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Journal Entries</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">{journalCount}</p>
        </div>

        {/* Reflection count */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Reflections Answered</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">{reflectionCount}</p>
        </div>
      </div>

      {/* Future: charts go here */}
      <div className="bg-[#E6F4F3] text-[#0D7A7E] p-4 rounded-lg text-sm">
        More insights & trends coming soon…
      </div>
    </motion.div>
  );
}
