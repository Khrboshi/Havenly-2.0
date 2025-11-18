"use server";

import { supabaseServer } from "@/lib/supabaseServer";

/**
 * Save a journal entry (server-side, authenticated)
 */
export async function saveJournal(content) {
  try {
    const supabase = await supabaseServer();

    // Fetch session to get user ID
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { error: "Not authenticated" };
    }

    const userId = session.user.id;

    const { error } = await supabase.from("journal").insert({
      user_id: userId,
      content,
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
    const supabase = await supabaseServer();

    const {
      data: { session },
    } = await supabase.auth.getSession();

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
