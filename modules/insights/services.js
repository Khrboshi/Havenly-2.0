import { supabase } from "@/lib/supabase";
import { logError } from "@/lib/errors";

export async function loadInsights(limit = 30) {
  try {
    const { data: moods } = await supabase
      .from("moods")
      .select("score, created_at")
      .order("created_at", { ascending: true })
      .limit(limit);

    const { count: journalCount } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true });

    const { count: reflectionCount } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true });

    return {
      moodHistory: moods || [],
      journalCount,
      reflectionCount,
    };
  } catch (e) {
    logError("Insights service error", e);

    return {
      moodHistory: [],
      journalCount: 0,
      reflectionCount: 0,
    };
  }
}
