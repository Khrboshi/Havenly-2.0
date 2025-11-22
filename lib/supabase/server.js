"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

/**
 * Create a Supabase client bound to Next.js server cookies.
 * Used by server components, route handlers, and server actions.
 */
export async function createServerSupabase() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}

/**
 * Convenience helper to fetch the current authenticated session.
 */
export async function getServerSession() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session ?? null;
}
