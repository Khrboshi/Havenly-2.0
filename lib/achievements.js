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

/** Unlock achievement for user */
export async function unlockAchievement(userId, key) {
  const supabase = createServerSupabase();

  try {
    await supabase.from("achievements").insert({
      user_id: userId,
      achievement_key: key,
    });
  } catch {
    // ignore errors to avoid breaking UX
  }
}

/** Check streak achievements */
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
