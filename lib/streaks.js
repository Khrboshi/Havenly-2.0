"use server";

import { createServerSupabase } from "./supabase/server";
import { checkStreakAchievements } from "./achievements";

/**
 * Update the user's streak based on today's check-in.
 * Returns the new current streak length.
 */
export async function updateUserStreak(user_id) {
  const supabase = await createServerSupabase();
  const today = new Date().toISOString().split("T")[0];

  // Get current streak row
  const { data: streak } = await supabase
    .from("streaks")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (!streak) {
    // First streak entry
    await supabase.from("streaks").insert({
      user_id,
      current_streak: 1,
      longest_streak: 1,
      last_checkin_date: today,
    });

    await checkStreakAchievements(user_id, 1);
    return 1;
  }

  const lastDate = streak.last_checkin_date;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let newCurrent;

  if (lastDate === today) {
    // Already checked in today → no change
    return streak.current_streak;
  } else if (lastDate === yesterdayStr) {
    // Continue streak
    newCurrent = streak.current_streak + 1;
  } else {
    // Streak broken
    newCurrent = 1;
  }

  const newLongest = Math.max(newCurrent, streak.longest_streak);

  await supabase
    .from("streaks")
    .update({
      current_streak: newCurrent,
      longest_streak: newLongest,
      last_checkin_date: today,
      updated_at: new Date(),
    })
    .eq("user_id", user_id);

  // Check for achievements to unlock
  await checkStreakAchievements(user_id, newCurrent);

  return newCurrent;
}

/**
 * Get the raw streak record for a user.
 */
export async function getUserStreak(user_id) {
  const supabase = await createServerSupabase();

  const { data } = await supabase
    .from("streaks")
    .select("*")
    .eq("user_id", user_id)
    .single();

  return data;
}
