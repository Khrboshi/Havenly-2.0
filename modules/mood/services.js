"use server";

import { supabaseServer } from "@/lib/supabaseServer";

/**
 * Save mood score (server-side, authenticated)
 */
export async function saveMood(score) {
  try {
    const supabase = await supabaseServer();

    // Get the current authenticated session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { error: "Not authenticated" };
    }

    const userId = session.user.id;

    const { error } = await supabase.from("moods").insert({
      user_id: userId,
      score,
    });

    if (error) {
      console.error("Save mood error:", error);
      return { error };
    }

    return { success: true };
  } catch (e) {
    console.error("Unexpected mood error:", e);
    return { error: e };
  }
}

/**
 * Fetch mood history (server-side)
 */
export async function getMoodHistory(limit = 30) {
  try {
    const supabase = await supabaseServer();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return [];

    const userId = session.user.id;

    const { data, error } = await supabase
      .from("moods")
      .select("score, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Load mood history error:", error);
      return [];
    }

    return data || [];
  } catch (e) {
    console.error("Unexpected mood history error:", e);
    return [];
  }
}
