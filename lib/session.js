import { supabaseServer } from "./supabaseServer";

/**
 * Fetch session securely on the server.
 * This MUST return: { user, session }
 */
export async function getServerSession() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Supabase getSession error:", error.message);
    return null;
  }

  return data?.session ?? null;
}

/**
 * Returns authenticated user or null
 */
export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
