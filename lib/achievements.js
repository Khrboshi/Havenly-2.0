import { supabaseServer } from "./supabase/server";

export async function getAchievements(userId) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", userId);

  if (error) return [];

  return data || [];
}
