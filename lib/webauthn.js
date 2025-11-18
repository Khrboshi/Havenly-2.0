import { supabaseBrowser } from "./supabase/browser";

export async function registerPasskey() {
  const supabase = supabaseBrowser();

  const { data, error } = await supabase.auth.signUpWithWebAuthn({
    options: {
      authenticatorType: "platform" // FaceID / TouchID / Device biometrics
    }
  });

  if (error) throw error;
  return data;
}

export async function loginWithPasskey() {
  const supabase = supabaseBrowser();

  const { data, error } = await supabase.auth.signInWithWebAuthn();

  if (error) throw error;
  return data;
}
