// modules/data/stats.js
"use server";

import { supabaseServer } from "@/lib/supabase/server.js";
import { logError } from "@/lib/errors";

/**
 * Get stats for the currently authenticated user.
 * Returns safe defaults if there is no session or an error occurs.
 */
export async function getUserStats() {
  try {
    const supabase = await supabaseServer();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return {
        latestMood: null,
        streak: 0,
        journalCount: 0,
        reflectionCount: 0,
        recentMoods: [],
      };
    }

    const userId = session.user.id;

    // Recent moods (last 30 entries)
    const { data: recentMoods = [], error: moodsError } = await supabase
      .from("moods")
      .select("score, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(30);

    if (moodsError) throw moodsError;

    const latestMood = recentMoods[0] ?? null;

    // Journal count
    const { count: journalCount = 0, error: journalError } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (journalError) throw journalError;

    // Reflection count
    const { count: reflectionCount = 0, error: reflectionError } =
      await supabase
        .from("reflections")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

    if (reflectionError) throw reflectionError;

    const streak = calculateStreakFromMoods(recentMoods);

    return {
      latestMood,
      streak,
      journalCount,
      reflectionCount,
      recentMoods,
    };
  } catch (err) {
    logError("getUserStats failed", err);
    return {
      latestMood: null,
      streak: 0,
      journalCount: 0,
      reflectionCount: 0,
      recentMoods: [],
    };
  }
}

/**
 * Very simple streak calculation:
 * counts how many consecutive days (including today, if logged) have mood entries.
 */
function calculateStreakFromMoods(moods) {
  if (!moods || moods.length === 0) return 0;

  // Extract unique calendar dates (YYYY-MM-DD) from moods
  const uniqueDates = [
    ...new Set(
      moods.map((m) => new Date(m.created_at).toISOString().slice(0, 10))
    ),
  ].sort((a, b) => (a < b ? 1 : -1)); // sort DESC (latest first)

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);
    const diffDays = Math.round((prev - curr) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}
