import { supabase } from "@/lib/supabase";
import { logError } from "@/lib/errors";

export async function saveMood(score) {
  try {
    return await supabase.from("moods").insert({
      score,
      created_at: new Date().toISOString(),
    });
  } catch (e) {
    logError("Save mood error", e);
    return { error: e };
  }
}

export async function getMoodHistory(limit = 30) {
  try {
    const { data } = await supabase
      .from("moods")
      .select("score, created_at")
      .order("created_at", { ascending: true })
      .limit(limit);

    return data || [];
  } catch (e) {
    logError("Load mood history error", e);
    return [];
  }
}

