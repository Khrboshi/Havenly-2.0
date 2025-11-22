// lib/achievements.js
import { supabaseServer } from "./supabase/server";
import { logError } from "./errors";

export async function getAchievements(userId) {
  try {
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      logError("getAchievements error", error);
      return [];
    }

    return data || [];
  } catch (err) {
    logError("getAchievements fatal error", err);
    return [];
  }
}
