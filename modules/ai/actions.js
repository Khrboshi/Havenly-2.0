"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { safeGroq } from "@/lib/groq";

/**
 * Generate a mood trend forecast using recent user mood data.
 */
export async function getMoodTrend(userId) {
  try {
    const supabase = await supabaseServer();

    // Load all moods in chronological order
    const { data: moods, error } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return { forecast: "Unable to analyze mood history." };
    }

    if (!moods || moods.length < 2) {
      return { forecast: "Not enough mood data to generate a trend yet." };
    }

    // AI prompt to analyze the mood pattern
    const prompt = `
You are an AI wellbeing assistant.

Analyze this user's mood history and give a short emotional trend summary.
Be accurate, warm, and supportive.

Mood Entries:
${JSON.stringify(moods)}

Respond in JSON ONLY:
{
  "forecast": "Short prediction or insight"
}
    `;

    const response = await safeGroq(prompt);

    try {
      const parsed = JSON.parse(response);
      return parsed;
    } catch (e) {
      console.error("JSON parse error:", e);
      return { forecast: "Unable to interpret emotional trend." };
    }
  } catch (e) {
    console.error("Trend generation error:", e);
    return { forecast: "Trend unavailable due to an internal error." };
  }
}
