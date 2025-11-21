"use server";

import { createServerSupabase } from "@/lib/supabase/server";

/**
 * Save reflection entry (server-side, authenticated)
 */
export async function saveReflection(content) {
  try {
    const supabase = await createServerSupabase();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Reflection session error:", sessionError);
      return { error: "Session error" };
    }

    if (!session) {
      return { error: "Not authenticated" };
    }

    const userId = session.user.id;
    const trimmed = String(content || "").trim();

    if (!trimmed) {
      return { error: "Content cannot be empty" };
    }

    const { error } = await supabase.from("reflections").insert({
      user_id: userId,
      content: trimmed,
    });

    if (error) {
      console.error("Save reflection error:", error);
      return { error };
    }

    return { success: true };
  } catch (e) {
    console.error("Unexpected reflection error:", e);
    return { error: e };
  }
}

/**
 * Count reflections for the current user
 */
export async function getReflectionCount() {
  try {
    const supabase = await createServerSupabase();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Reflection count session error:", sessionError);
      return 0;
    }

    if (!session) return 0;

    const userId = session.user.id;

    const { count, error } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      console.error("Reflection count error:", error);
      return 0;
    }

    return count || 0;
  } catch (e) {
    console.error("Unexpected reflection count error:", e);
    return 0;
  }
}
