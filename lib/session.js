import { supabaseServer } from "./supabase/server";

export async function getServerSession() {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
