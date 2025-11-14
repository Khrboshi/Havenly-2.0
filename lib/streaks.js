import { supabase } from "./supabase";
import { checkStreakAchievements } from "./achievements";

export async function updateUserStreak(user_id) {
  const today = new Date().toISOString().split("T")[0];

  // Get current streak
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

    // Check achievements for day 1
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

  // Update streak in database
  await supabase
    .from("streaks")
    .update({
      current_streak: newCurrent,
      longest_streak: newLongest,
      last_checkin_date: today,
      updated_at: new Date(),
    })
    .eq("user_id", user_id);

  // 🔥 CHECK FOR ACHIEVEMENTS
  await checkStreakAchievements(user_id, newCurrent);

  return newCurrent;
}

export async function getUserStreak(user_id) {
  const { data } = await supabase
    .from("streaks")
    .select("*")
    .eq("user_id", user_id)
    .single();

  return data;
}
