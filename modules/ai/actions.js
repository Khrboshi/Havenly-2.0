import { safeGroq } from "@/lib/groq";
import { supabaseServer } from "@/lib/supabaseServer";

export async function getMoodTrend(userId) {
  try {
    const supabase = supabaseServer();

    const { data: moods } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (!moods || moods.length < 2) {
      return { forecast: "Not enough data to predict a trend yet." };
    }

    const prompt = `
You are an emotional wellbeing assistant.
Analyze the following mood entries:

${JSON.stringify(moods)}

Return JSON:
{
  "forecast": "Short summary"
}
`;

    const result = await safeGroq(prompt);

    try {
      return JSON.parse(result);
    } catch {
      return { forecast: "Unable to generate a prediction." };
    }
  } catch (error) {
    console.error("AI trend error:", error);
    return { forecast: "Trend unavailable." };
  }
}
