import { supabaseServer } from "./supabase/server";

export async function getServerSession() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("getSession error:", error.message);
    return null;
  }

  return data.session ?? null;
}

export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
