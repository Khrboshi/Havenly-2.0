import { createServerSupabase } from "./supabase/server";

/**
 * Get current Supabase session on the server.
 * Throws on hard errors, returns null if no session.
 */
export async function getServerSession() {
  const supabase = createServerSupabase();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    // Optional: log or handle as needed
    console.error("Supabase getServerSession error:", error.message);
    return null;
  }

  return session;
}

/**
 * Convenience helper to get the current authenticated user on the server.
 */
export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
