"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { groq } from "@/lib/groq";

export async function getMoodTrend() {
  try {
    const supabase = supabaseServer();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { forecast: "No user session." };

    const { data: moods } = await supabase
      .from("moods")
      .select("mood")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(20);

    if (!moods || moods.length === 0) {
      return { forecast: "No mood data yet." };
    }

    const prompt = `
      Analyze this mood list: ${JSON.stringify(moods)}
      Provide a 1-sentence emotional trend summary.
    `;

    const aiResponse = await groq(prompt);

    return { forecast: aiResponse };
  } catch (err) {
    console.error("Trend generation error:", err);
    return { forecast: "Unable to generate trend." };
  }
}
