"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

import { getDashboardStats } from "@/modules/dashboard/services";
import { predictMoodTrend } from "@/modules/ai/services";

import { isFeatureAvailable } from "@/modules/premium/services";

import PremiumNudge from "@/components/PremiumNudge";
import DailyNudge from "@/components/DailyNudge";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Load dashboard stats
      const result = await getDashboardStats();
      setStats(result);
      setLoading(false);

      // AI forecast (premium gated)
      setAiLoading(true);

      try {
        const ai = await predictMoodTrend(result.recentMoods);
        setForecast(ai);
      } catch {
        setForecast(null);
      }

      setAiLoading(false);
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

      {/* Standard Dashboard Cards */}
      <section className="grid grid-cols-2 gap-4">
        <Card label="Today’s Mood" value={stats.latestMood ?? "–"} />
        <Card label="Journal Entries" value={stats.journalCount} />

        <div className="col-span-2">
          <Card label="Reflections Answered" value={stats.reflectionCount} />
        </div>
      </section>

      <DailyNudge message="Be kind to yourself today. Small steps count too." />

      {/* ----------------------------------------- */}
      {/* AI FORECAST BLOCK — Premium Controlled    */}
      {/* ----------------------------------------- */}

      {aiLoading && isFeatureAvailable("ai_forecast") && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-gray-600 text-sm animate-pulse">
            Generating your trend forecast…
          </p>
        </div>
      )}

      {!aiLoading &&
        forecast &&
        isFeatureAvailable("ai_forecast") && (
          <div className="bg-[#E6F4F3] border border-[#0D7A7E]/30 rounded-lg p-4 shadow-sm space-y-2">
            <p className="font-semibold text-[#0D7A7E]">AI Mood Forecast</p>
            <p className="text-gray-700 text-sm">{forecast.forecast}</p>
          </div>
        )}

      <PremiumNudge />
    </motion.div>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#0D7A7E]">{value}</p>
    </div>
  );
}
