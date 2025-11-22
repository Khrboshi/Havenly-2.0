"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { logError } from "@/lib/errors";

export async function getUserProfile() {
  try {
    const supabase = supabaseBrowser();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user || null;
  } catch (e) {
    logError("Load profile error", e);
    return null;
  }
}

export async function logoutUser() {
  try {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();

    // No need to manually clear sb-* cookies; Supabase handles that.
    return true;
  } catch (e) {
    logError("Logout error", e);
    return false;
  }
}
