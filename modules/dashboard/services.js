import { supabase } from "@/lib/supabase";
import { logError } from "@/lib/errors";

export async function getDashboardStats() {
  try {
    // Latest mood
    const { data: moodData } = await supabase
      .from("moods")
      .select("score, created_at")
      .order("created_at", { ascending: false })
      .limit(1);

    // Journal count
    const { count: journalCount } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true });

    // Reflections count
    const { count: reflectionCount } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true });

    return {
      latestMood: moodData?.[0]?.score || null,
      journalCount: journalCount || 0,
      reflectionCount: reflectionCount || 0,
    };
  } catch (e) {
    logError("Dashboard service error", e);
    return { latestMood: null, journalCount: 0, reflectionCount: 0 };
  }
}

