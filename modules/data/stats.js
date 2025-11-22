// modules/data/stats.js
"use server";

import { supabaseServer } from "@/lib/supabase/server.js";
import { logError } from "@/lib/errors";

export async function getUserStats() {
  try {
    const supabase = supabaseServer();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return {
        latestMood: null,
        streak: 0,
        journalCount: 0,
        reflectionCount: 0,
        recentMoods: [],
      };
    }

    const userId = session.user.id;

    // Recent moods
    const { data: recentMoods = [] } = await supabase
      .from("moods")
      .select("score, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(30);

    const latestMood = recentMoods?.[0] ?? null;

    // Journal count
    const { count: journalCount = 0 } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Reflection count
    const { count: reflectionCount = 0 } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const streak = calculateStreak(recentMoods);

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

function calculateStreak(moods) {
  if (!moods || moods.length === 0) return 0;

  const uniqueDates = [
    ...new Set(
      moods.map((m) =>
        new Date(m.created_at).toISOString().slice(0, 10)
      )
    ),
  ].sort((a, b) => (a < b ? 1 : -1));

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);
    const diff = Math.round((prev - curr) / (1000 * 60 * 60 * 24));
    if (diff === 1) streak++;
    else break;
  }

  return streak;
}
