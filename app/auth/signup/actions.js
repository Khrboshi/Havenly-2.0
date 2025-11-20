"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export async function signupAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/auth/login");
}
