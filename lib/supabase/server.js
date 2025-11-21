"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Unified Supabase server client for Next.js App Router.
 * - Works in Server Components, Route Handlers, and Server Actions
 * - Keeps Supabase auth session in sync via cookies
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
          // Ensure path is always root so auth works across the app
          cookieStore.set(name, value, {
            ...options,
            path: "/",
          });
        },
        remove(name, options) {
          cookieStore.set(name, "", {
            ...options,
            path: "/",
            maxAge: 0,
          });
        },
      },
    }
  );
}

/**
 * Backwards-compat alias for older imports that still use `supabaseServer()`.
 * This lets both old and new code work without breaking anything.
 */
export async function supabaseServer() {
  return createServerSupabase();
}
