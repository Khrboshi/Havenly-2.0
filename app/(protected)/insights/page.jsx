"use client";

import { useEffect, useState } from "react";
import { loadInsights } from "@/modules/insights/services";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function InsightsPage() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      const data = await loadInsights();
      const avg =
        data.moodHistory.length > 0
          ? (
              data.moodHistory.reduce((a, b) => a + b.score, 0) /
              data.moodHistory.length
            ).toFixed(1)
          : null;

      setInsights({
        ...data,
        averageMood: avg,
      });

      setLoading(false);
    }

    run();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-600 animate-pulse">
        Loading insights…
      </div>
    );
  }

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
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Average Mood</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">
            {insights.averageMood ?? "–"}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Most Recent Mood</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">
            {insights.moodHistory.at(-1)?.score ?? "–"}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Journal Entries</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">
            {insights.journalCount}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Reflections Answered</p>
          <p className="text-2xl font-bold text-[#0D7A7E]">
            {insights.reflectionCount}
          </p>
        </div>
      </div>

      <div className="bg-[#E6F4F3] text-[#0D7A7E] p-4 rounded-lg text-sm">
        More insights & trends coming soon…
      </div>
    </motion.div>
  );
}
