"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = supabaseServer(); // no await

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return { error: "Invalid login credentials" };
  }

  redirect("/dashboard");
}
