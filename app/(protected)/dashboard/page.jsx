"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PremiumNudge from "@/components/PremiumNudge";
import DailyNudge from "@/components/DailyNudge";
import { fadeIn } from "@/lib/animations";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [moodToday, setMoodToday] = useState(null);
  const [journalCount, setJournalCount] = useState(0);
  const [reflectCount, setReflectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch basic stats for dashboard
  useEffect(() => {
    async function loadStats() {
      try {
        const { data: moodData } = await supabase
          .from("moods")
          .select("score, created_at")
          .order("created_at", { ascending: false })
          .limit(1);

        const { count: journalEntries } = await supabase
          .from("journal")
          .select("*", { count: "exact", head: true });

        const { count: reflectionEntries } = await supabase
          .from("reflections")
          .select("*", { count: "exact", head: true });

        setMoodToday(moodData?.[0]?.score || null);
        setJournalCount(journalEntries || 0);
        setReflectCount(reflectionEntries || 0);
      } catch (e) {
        console.error("Dashboard load error:", e);
      }

      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-600 animate-pulse">
        Loading dashboard…
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <section>
        <h2 className="text-xl font-semibold text-[#0D7A7E] mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-700 text-sm">
          Here’s a quick overview of your emotional wellness today.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Today’s Mood</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">
            {moodToday !== null ? moodToday : "–"}
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Journal Entries</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">{journalCount}</p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg col-span-2">
          <p className="text-sm text-gray-500 mb-1">Reflection Questions Answered</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">{reflectCount}</p>
        </div>
      </section>

      <DailyNudge message="Be kind to yourself today. Small steps count too." />

      <PremiumNudge />
    </motion.div>
  );
}
