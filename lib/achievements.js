import { createServerSupabase } from "./supabase/server";

export const ACHIEVEMENTS = [
  {
    key: "streak_1",
    title: "First Step",
    emoji: "⭐",
    description: "Completed your first daily reflection streak.",
  },
  {
    key: "streak_3",
    title: "Streak Rising",
    emoji: "🔥",
    description: "Maintained a 3-day reflection streak.",
  },
  {
    key: "streak_7",
    title: "One Week Strong",
    emoji: "💪",
    description: "Maintained a 7-day reflection streak.",
  },
  {
    key: "streak_14",
    title: "Two Weeks of Growth",
    emoji: "🌱",
    description: "Maintained a 14-day reflection streak.",
  },
  {
    key: "streak_30",
    title: "Consistency Master",
    emoji: "🏆",
    description: "Maintained a 30-day reflection streak.",
  },
];

/**
 * Unlock a single achievement for a user.
 * Safe: ignores duplicate insert errors.
 */
export async function unlockAchievement(userId, key) {
  const supabase = await createServerSupabase();

  try {
    await supabase.from("achievements").insert({
      user_id: userId,
      achievement_key: key,
    });
  } catch {
    // ignore duplicate or transient errors; not critical
  }
}

/**
 * Check and unlock streak-based achievements for a given streak length.
 * Returns an array of achievement keys that should now be unlocked.
 */
export async function checkStreakAchievements(userId, streak) {
  const unlocked = [];

  for (const ach of ACHIEVEMENTS) {
    if (ach.key.startsWith("streak_")) {
      const threshold = Number(ach.key.split("_")[1]);

      if (streak >= threshold) {
        unlocked.push(ach.key);
        await unlockAchievement(userId, ach.key);
      }
    }
  }

  return unlocked;
}
