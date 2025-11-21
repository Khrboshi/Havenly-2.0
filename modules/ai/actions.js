"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { safeGroq } from "@/lib/groq";

/**
 * Generate a mood trend forecast using recent user mood data.
 * Auto-detects the authenticated user (no userId argument needed).
 */
export async function getMoodTrend() {
  try {
    const supabase = await createServerSupabase();

    // Load authenticated session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Session load error:", sessionError);
      return { forecast: "Unable to load your session. Please log in again." };
    }

    if (!session) {
      return { forecast: "Please log in to view your emotional trend." };
    }

    const userId = session.user.id;

    // Load user's full mood history (oldest → newest)
    const { data: moods, error } = await supabase
      .from("moods")
      .select("score, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase moods error:", error);
      return { forecast: "Unable to analyze mood history." };
    }

    if (!moods || moods.length < 2) {
      return {
        forecast:
          "Not enough mood data yet. Try logging your mood for a few days.",
      };
    }

    const prompt = `
You are a compassionate AI wellbeing analyst.

Analyze the user's mood history and identify their emotional trend.
Base this exclusively on the numerical mood scores (1=low, 5=high).

Mood entries (oldest → newest):
${JSON.stringify(moods, null, 2)}

Respond in *valid JSON ONLY* using this format:

{
  "forecast": "A short, warm emotional insight (1–2 sentences)."
}
    `;

    const response = await safeGroq(prompt);

    let parsed;
    try {
      parsed = JSON.parse(response);
    } catch (e) {
      console.error("AI JSON parse error:", e, "Raw:", response);
      return { forecast: "Unable to interpret emotional trend." };
    }

    if (!parsed.forecast) {
      return { forecast: "No emotional trend available." };
    }

    return parsed;
  } catch (e) {
    console.error("Trend generation error:", e);
    return { forecast: "Trend unavailable due to an internal error." };
  }
}
