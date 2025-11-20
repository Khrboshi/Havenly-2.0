"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const supabase = supabaseServer();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Log raw Supabase response for debugging
    console.log("LOGIN RESPONSE:", { error, data });

    if (error) {
      return { error: error.message || "Unable to log in." };
    }

    // Logged in successfully
    redirect("/dashboard");
  } catch (err) {
    console.error("UNEXPECTED LOGIN ERROR:", err);
    return { error: "Unexpected server error. Please try again." };
  }
}
