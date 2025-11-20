import { supabaseServer } from "./supabaseServer";

/**
 * Returns full session object from cookies.
 */
export async function getServerSession() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Supabase getSession error:", error.message);
    return null;
  }

  return data.session;
}

/**
 * Returns only the authenticated user.
 */
export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
