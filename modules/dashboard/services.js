"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { logError } from "@/lib/errors";

export async function getDashboardStats() {
  try {
    const supabase = await createServerSupabase();

    const { data: moodData, error: moodError } = await supabase
      .from("moods")
      .select("score, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    if (moodError) throw moodError;

    const { count: journalCount, error: journalError } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true });

    if (journalError) throw journalError;

    const { count: reflectionCount, error: reflectionError } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true });

    if (reflectionError) throw reflectionError;

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
