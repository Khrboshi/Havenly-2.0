import { supabase } from "@/lib/supabase";
import { logError } from "@/lib/errors";

export async function saveReflection(content) {
  try {
    return await supabase.from("reflections").insert({
      content,
      created_at: new Date().toISOString(),
    });
  } catch (e) {
    logError("Save reflections error", e);
    return { error: e };
  }
}

export async function getReflectionCount() {
  try {
    const { count } = await supabase
      .from("reflections")
      .select("*", { count: "exact", head: true });

    return count || 0;
  } catch (e) {
    logError("Reflection count error", e);
    return 0;
  }
}
