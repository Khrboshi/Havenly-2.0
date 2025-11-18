import { supabase } from "@/lib/supabase";
import { logError } from "@/lib/errors";

export async function saveJournal(content) {
  try {
    return await supabase.from("journal").insert({
      content,
      created_at: new Date().toISOString(),
    });
  } catch (e) {
    logError("Save journal error", e);
    return { error: e };
  }
}

export async function getJournalCount() {
  try {
    const { count } = await supabase
      .from("journal")
      .select("*", { count: "exact", head: true });

    return count || 0;
  } catch (e) {
    logError("Journal count error", e);
    return 0;
  }
}
