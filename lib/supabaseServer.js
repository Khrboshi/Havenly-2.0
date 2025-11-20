import { createServerSupabase } from "./supabase/server";

/**
 * Legacy wrapper for old code.
 */
export async function supabaseServer() {
  return createServerSupabase();
}
