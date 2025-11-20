"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

/**
 * Server action for secure login
 */
export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = supabaseServer();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Successful login → redirect to dashboard
  redirect("/dashboard");
}
