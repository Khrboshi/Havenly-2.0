"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // ✅ IMPORTANT: await the async helper
  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signInWithPassword({
    email: String(email),
    password: String(password),
  });

  if (error) {
    console.error("Login error:", error);
    return { error: "Invalid email or password." };
  }

  // On success redirect into the protected area
  redirect("/dashboard");
}
