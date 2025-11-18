"use server";

import { supabaseServer } from "@/lib/supabaseServer";

/**
 * Calculate a daily streak from mood entries
 */
function calculateStreak(moodEntries) {
  if (!moodEntries || moodEntries.length === 0) return 0;

  const days = new Set(
    moodEntries.map((m) => new Date(m.created_at).toDateString())
  );

  let streak = 0;
  let current = new Date();

  while (true) {
    const dateStr = current.toDateString();
    if (days.has(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Main stats loader
 */
export async function getUserStats() {
  try {
    const supabase = await supabaseServer();

    // Load authenticated session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        latestMood: null,
        recentMoods: [],
        journalCount: 0,
        reflectionCount: 0,
        streak: 0,
      };
    }

    const userId = session.user.id;

    // --- Latest mood ---
    const { data: latestMood } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // --- Last 14 days of moods ---
    const twoWeeksAgo = new Date(Date.now() - 14 * 86400000).toISOString();

    const { data: recentMoods } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", twoWeeksAgo)
      .order("created_at", { ascending: false });

    // --- Journal count ---
    const { count: journalCount } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // --- Reflection count ---
    const { count: reflectionCount } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // --- Streak ---
    const streak = calculateStreak(recentMoods || []);

    return {
      latestMood: latestMood || null,
      recentMoods: recentMoods || [],
      journalCount: journalCount || 0,
      reflectionCount: reflectionCount || 0,
      streak,
    };
  } catch (error) {
    console.error("getUserStats error:", error);

    return {
      latestMood: null,
      recentMoods: [],
      journalCount: 0,
      reflectionCount: 0,
      streak: 0,
    };
  }
}
