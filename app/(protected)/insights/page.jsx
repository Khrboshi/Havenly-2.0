"use client";

import { useEffect, useState } from "react";
import { loadInsights } from "@/modules/insights/services";
import { analyzeJournalEntry, predictMoodTrend } from "@/modules/ai/services";

import { isFeatureAvailable } from "@/modules/premium/services";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function InsightsPage() {
  const [insights, setInsights] = useState(null);
  const [aiSummary, setAISummary] = useState(null);
  const [aiForecast, setAIForecast] = useState(null);

  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);

  useEffect(() => {
    async function run() {
      const data = await loadInsights();

      // Average mood calculation
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

      // AI section (premium controlled)
      setAiLoading(true);

      try {
        // Journal Summary
        if (isFeatureAvailable("ai_insights")) {
          const combined = data.recentJournal
            .map((j) => j.content)
            .join("\n\n")
            .slice(0, 1800);

          const summary =
            combined.length > 0
              ? await analyzeJournalEntry(combined)
              : null;

          setAISummary(summary);
        }

        // Trend Forecast
        if (isFeatureAvailable("ai_forecast")) {
          const forecast = await predictMoodTrend(data.moodHistory);
          setAIForecast(forecast);
        }
      } catch {
        setAISummary(null);
        setAIForecast(null);
      }

      setAiLoading(false);
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
          Your recent emotional patterns.
        </p>
      </section>

      {/* Standard Insight Cards */}
      <div className="space-y-4">
        <Card label="Average Mood" value={insights.averageMood ?? "–"} />
        <Card
          label="Most Recent Mood"
          value={insights.moodHistory.at(-1)?.score ?? "–"}
        />
        <Card label="Journal Entries" value={insights.journalCount} />
        <Card label="Reflections Answered" value={insights.reflectionCount} />
      </div>

      {/* --------------------------- */}
      {/* AI ANALYSIS (Premium Only)  */}
      {/* --------------------------- */}

      {aiLoading &&
        (isFeatureAvailable("ai_insights") ||
          isFeatureAvailable("ai_forecast")) && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-gray-600 text-sm animate-pulse">
              Analyzing your data…
            </p>
          </div>
        )}

      {/* Premium: AI Journal Summary */}
      {!aiLoading &&
        aiSummary &&
        isFeatureAvailable("ai_insights") && (
          <div className="bg-[#E6F4F3] border border-[#0D7A7E]/30 rounded-lg p-4 shadow-sm space-y-2">
            <p className="font-semibold text-[#0D7A7E]">
              AI Summary of Your Recent Journaling
            </p>
            <p className="text-gray-700 text-sm">{aiSummary.summary}</p>

            <p className="text-sm mt-2">
              <span className="font-medium text-[#0D7A7E]">Sentiment:</span>{" "}
              {aiSummary.sentiment}
            </p>

            {aiSummary.keywords?.length > 0 && (
              <p className="text-sm">
                <span className="font-medium text-[#0D7A7E]">Themes:</span>{" "}
                {aiSummary.keywords.join(", ")}
              </p>
            )}
          </div>
        )}

      {/* Premium: AI Mood Trend Forecast */}
      {!aiLoading &&
        aiForecast &&
        isFeatureAvailable("ai_forecast") && (
          <div className="bg-[#E6F4F3] border border-[#0D7A7E]/30 rounded-lg p-4 shadow-sm space-y-2">
            <p className="font-semibold text-[#0D7A7E]">AI Mood Trend Prediction</p>
            <p className="text-gray-700 text-sm">{aiForecast.forecast}</p>
          </div>
        )}

      {/* Footer */}
      <div className="text-[#0D7A7E] text-sm p-4 bg-[#E6F4F3] rounded-lg">
        AI features are experimental and may evolve over time.
      </div>
    </motion.div>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#0D7A7E]">{value}</p>
    </div>
  );
}
