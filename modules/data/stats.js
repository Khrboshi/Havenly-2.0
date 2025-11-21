"use server";

import { createServerSupabase } from "@/lib/supabase/server";

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
    const supabase = await createServerSupabase();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Session error:", sessionError);
      return {
        latestMood: null,
        recentMoods: [],
        journalCount: 0,
        reflectionCount: 0,
        streak: 0,
      };
    }

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

    // Latest mood
    const { data: latestMood, error: latestMoodError } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestMoodError) {
      console.error("Latest mood error:", latestMoodError);
    }

    // Last 14 days of moods
    const twoWeeksAgo = new Date(Date.now() - 14 * 86400000).toISOString();

    const { data: recentMoods, error: recentError } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", twoWeeksAgo)
      .order("created_at", { ascending: false });

    if (recentError) {
      console.error("Recent moods error:", recentError);
    }

    // Journal count
    const { count: journalCount, error: journalError } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (journalError) {
      console.error("Journal count error:", journalError);
    }

    // Reflection count
    const { count: reflectionCount, error: reflectionError } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (reflectionError) {
      console.error("Reflection count error:", reflectionError);
    }

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
