import { createServerSupabase } from "./supabase/server";

/**
 * Backwards-compatible helper used in older code.
 * Prefer createServerSupabase() in new files.
 */
export async function supabaseServer() {
  // Kept async for backward compatibility, even though it's sync internally
  return createServerSupabase();
}
