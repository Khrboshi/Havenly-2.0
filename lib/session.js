import { createServerSupabase } from "./supabase/server";

/**
 * Get the currently authenticated Supabase session (server-side).
 */
export async function getServerSession() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  return data;
} = await supabase.auth.getSession();

  if (error) {
    console.error("Supabase session error:", error.message);
    return null;
  }

  return session;
}

/**
 * Returns the authenticated user or null.
 */
export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
