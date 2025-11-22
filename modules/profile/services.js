import { supabase } from "@/lib/supabase";
import { logError } from "@/lib/errors";

export async function getUserProfile() {
  try {
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
    await supabase.auth.signOut();
    return true;
  } catch (e) {
    logError("Logout error", e);
    return false;
  }
}
