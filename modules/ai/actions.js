// modules/ai/actions.js
"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { groq } from "@/lib/groq";
import { logError } from "@/lib/errors";

export async function getMoodTrend() {
  try {
    const supabase = supabaseServer();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { forecast: "No user session yet." };
    }

    const { data: moods } = await supabase
      .from("moods")
      .select("mood, score, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(20);

    if (!moods || moods.length === 0) {
      return { forecast: "No mood history yet." };
    }

    const prompt = `
      You are an emotional wellbeing assistant.

      These are the user's recent moods:
      ${JSON.stringify(moods)}

      In one short and gentle sentence, summarize the trend and encouragement.
    `;

    const aiResponse = await groq(prompt);

    return { forecast: aiResponse };
  } catch (err) {
    logError("Trend generation error", err);
    return { forecast: "Unable to generate a trend at the moment." };
  }
}
