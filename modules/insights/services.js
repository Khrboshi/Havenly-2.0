"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { logError } from "@/lib/errors";

export async function loadInsights(limit = 30) {
  try {
    const supabase = await createServerSupabase();

    const { data: moods, error: moodError } = await supabase
      .from("moods")
      .select("score, created_at")
      .order("created_at", { ascending: true })
      .limit(limit);

    if (moodError) throw moodError;

    const { data: journalEntries, error: journalError } = await supabase
      .from("journal")
      .select("content, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    if (journalError) throw journalError;

    const { count: journalCount, error: journalCountError } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true });

    if (journalCountError) throw journalCountError;

    const {
      count: reflectionCount,
      error: reflectionCountError,
    } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true });

    if (reflectionCountError) throw reflectionCountError;

    return {
      moodHistory: moods || [],
      journalCount: journalCount || 0,
      reflectionCount: reflectionCount || 0,
      recentJournal: journalEntries || [],
    };
  } catch (e) {
    logError("Insights service error", e);

    return {
      moodHistory: [],
      journalCount: 0,
      reflectionCount: 0,
      recentJournal: [],
    };
  }
}
