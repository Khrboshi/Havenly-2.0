"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { logError } from "@/lib/errors";

export async function getUserProfile() {
  try {
    const supabase = await createServerSupabase();

    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;

    return data?.user ?? null;
  } catch (e) {
    logError("Load profile error", e);
    return null;
  }
}

export async function logoutUser() {
  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    return true;
  } catch (e) {
    logError("Logout error", e);
    return false;
  }
}
