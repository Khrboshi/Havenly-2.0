"use server";

import { supabaseServer } from "@/lib/supabase/server";

export async function loginAction(formData) {
  const supabase = await supabaseServer();

  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}
