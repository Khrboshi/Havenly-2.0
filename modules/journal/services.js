"use server";

import { createServerSupabase } from "@/lib/supabase/server";

/**
 * Save a journal entry (server-side, authenticated)
 */
export async function saveJournal(content) {
  try {
    const supabase = await createServerSupabase();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Journal session error:", sessionError);
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

    const { error } = await supabase.from("journal").insert({
      user_id: userId,
      content: trimmed,
    });

    if (error) {
      console.error("Save journal error:", error);
      return { error };
    }

    return { success: true };
  } catch (e) {
    console.error("Unexpected journal error:", e);
    return { error: e };
  }
}

/**
 * Get number of journal entries (server-side)
 */
export async function getJournalCount() {
  try {
    const supabase = await createServerSupabase();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Journal count session error:", sessionError);
      return 0;
    }

    if (!session) return 0;

    const userId = session.user.id;

    const { count, error } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      console.error("Journal count error:", error);
      return 0;
    }

    return count || 0;
  } catch (e) {
    console.error("Unexpected journal count error:", e);
    return 0;
  }
}
