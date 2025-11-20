import { createServerSupabase } from "./supabase/server";

/**
 * Retrieves the active Supabase session on the server.
 */
export async function getServerSession() {
  const supabase = createServerSupabase();
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

/**
 * Convenience helper: returns the authenticated user or null.
 */
export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
