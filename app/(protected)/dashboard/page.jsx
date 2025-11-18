"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { getDashboardStats } from "@/modules/dashboard/services";
import PremiumNudge from "@/components/PremiumNudge";
import DailyNudge from "@/components/DailyNudge";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await getDashboardStats();
      setStats(response);
      setLoading(false);
    }

    load();
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
            {stats.latestMood ?? "–"}
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Journal Entries</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">
            {stats.journalCount}
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg col-span-2">
          <p className="text-sm text-gray-500 mb-1">Reflections Answered</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">
            {stats.reflectionCount}
          </p>
        </div>
      </section>

      <DailyNudge message="Be kind to yourself today. Small steps count too." />

      <PremiumNudge />
    </motion.div>
  );
}
