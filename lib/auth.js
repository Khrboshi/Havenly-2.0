"use client";

import { createBrowserSupabase } from "./supabase/browser";

/**
 * Client-side sign up helper.
 * Use from client components only.
 */
export async function signUp(email, password) {
  const supabase = createBrowserSupabase();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) throw error;
}

/**
 * Client-side sign in helper.
 */
export async function signIn(email, password) {
  const supabase = createBrowserSupabase();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}
