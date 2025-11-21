"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();

  redirect("/auth/login");
}
