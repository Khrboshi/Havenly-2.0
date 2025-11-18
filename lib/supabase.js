import { createClient } from "@supabase/supabase-js";
import { logError } from "./errors";

// Safe Supabase instance with session handling
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

/**
 * Wrap Supabase calls safely.
 * Prevents UI crashes if Supabase is temporarily unreachable.
 */
export async function safeQuery(fn, context = "Unknown Supabase Call") {
  try {
    return await fn();
  } catch (e) {
    logError(`Supabase Error (${context})`, e);
    return { data: null, error: e };
  }
}
