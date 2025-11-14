import { supabase } from "./supabase";

export async function signUp(email, password) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  });
  if (error) throw error;
}

export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
}
