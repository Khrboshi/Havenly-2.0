import { supabaseServer } from "@/lib/supabaseServer";

export async function getUserStats(userId) {
  try {
    const supabase = supabaseServer();

    const { data: latestMood } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const { data: recentMoods } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .gte(
        "created_at",
        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      )
      .order("created_at", { ascending: false });

    const { count: journalCount } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: reflectionCount } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    return {
      latestMood: latestMood || null,
      recentMoods: recentMoods || [],
      journalCount: journalCount || 0,
      reflectionCount: reflectionCount || 0,
    };
  } catch (error) {
    console.error("getUserStats error:", error);
    return null;
  }
}
