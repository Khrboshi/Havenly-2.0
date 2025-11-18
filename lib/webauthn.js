"use client";

import { createClient } from "@supabase/supabase-js";
import {
  startAuthentication,
  startRegistration
} from "@supabase/webauthn-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// REGISTER FaceID / TouchID
export async function registerPasskey(email) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true }
  });

  if (error) throw new Error(error.message);

  await startRegistration({ email });
}

// LOGIN with FaceID / TouchID
export async function loginWithPasskey(email) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email
  });

  if (error) throw new Error(error.message);

  await startAuthentication({ email });
}
