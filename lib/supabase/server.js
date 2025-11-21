"use server";

import { createServerSupabase } from "./supabase/server";

/**
 * Convenience wrapper used by server actions and modules that expect
 * a `supabaseServer()` helper.
 */
export async function supabaseServer() {
  return createServerSupabase();
}
