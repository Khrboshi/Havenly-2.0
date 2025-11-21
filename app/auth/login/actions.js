"use server";

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

  return { success: true };
}
