"use server";

import { createServerSupabase } from "@/lib/supabase/server";

/**
 * Save mood score (server-side, authenticated)
 */
export async function saveMood(score) {
  try {
    const supabase = await createServerSupabase();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Mood session error:", sessionError);
      return { error: "Session error" };
    }

    if (!session) {
      return { error: "Not authenticated" };
    }

    const userId = session.user.id;

    const numericScore = Number(score);
    if (!Number.isFinite(numericScore) || numericScore < 1 || numericScore > 5) {
      return { error: "Invalid score" };
    }

    const { error } = await supabase.from("moods").insert({
      user_id: userId,
      score: numericScore,
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
    const supabase = await createServerSupabase();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Mood history session error:", sessionError);
      return [];
    }

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
