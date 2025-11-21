"use server";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // IMPORTANT: server-side redirect after successful login
  redirect("/dashboard");
}
