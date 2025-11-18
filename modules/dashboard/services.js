import { supabase } from "@/lib/supabase";
import { logError } from "@/lib/errors";

export async function getDashboardStats() {
  try {
    const { data: moodData } = await supabase
      .from("moods")
      .select("score, created_at")
      .order("created_at", { ascending: false })
      .limit(10); // Keep recent history for AI

    const { count: journalCount } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true });

    const { count: reflectionCount } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true });

    return {
      recentMoods: moodData || [],
      latestMood: moodData?.[0]?.score ?? null,
      journalCount: journalCount || 0,
      reflectionCount: reflectionCount || 0,
    };
  } catch (e) {
    logError("Dashboard service error", e);
    return {
      recentMoods: [],
      latestMood: null,
      journalCount: 0,
      reflectionCount: 0,
    };
  }
}
