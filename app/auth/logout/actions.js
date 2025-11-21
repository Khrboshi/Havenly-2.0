"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const supabase = await supabaseServer();

  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Logout error:", error);
    // Even if sign-out fails, we can still redirect – cookies may already be cleared
  }

  redirect("/auth/login");
}
