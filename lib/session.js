import { supabaseServer } from "@/lib/supabaseServer";

/**
 * Returns the full Supabase session (server-side).
 */
export async function getServerSession() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Supabase session error:", error.message);
    return null;
  }

  return data?.session ?? null;
}

/**
 * Returns the authenticated user (server-side).
 */
export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
