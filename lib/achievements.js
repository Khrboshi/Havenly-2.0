import { supabase } from "./supabase";

export const ACHIEVEMENT_DEFINITIONS = [
  {
    code: "STREAK_3",
    days: 3,
    title: "Mindful Start",
    description: "Completed a 3-day check-in streak.",
  },
  {
    code: "STREAK_7",
    days: 7,
    title: "Growing Strong",
    description: "7 days of consistent check-ins. Amazing!",
  },
  {
    code: "STREAK_14",
    days: 14,
    title: "Consistency Hero",
    description: "14-day streak unlocked. You’re building a habit!",
  },
  {
    code: "STREAK_30",
    days: 30,
    title: "Life Builder",
    description: "30-day streak. True dedication.",
  },
  {
    code: "STREAK_60",
    days: 60,
    title: "Resilience Master",
    description: "60-day streak. Powerful commitment.",
  }
];

export async function unlockAchievement(user_id, achievement) {
  // Check if already unlocked
  const { data: existing } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", user_id)
    .eq("code", achievement.code)
    .maybeSingle();

  if (existing) return false; // Already unlocked

  await supabase.from("achievements").insert({
    user_id,
    code: achievement.code,
    title: achievement.title,
    description: achievement.description,
  });

  return true;
}

export async function checkStreakAchievements(user_id, streakCount) {
  const unlocked = [];

  for (const ach of ACHIEVEMENT_DEFINITIONS) {
    if (streakCount >= ach.days) {
      const wasNew = await unlockAchievement(user_id, ach);
      if (wasNew) unlocked.push(ach);
    }
  }

  return unlocked; // For popups
}
