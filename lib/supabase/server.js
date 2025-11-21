"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Unified Supabase server client for Next.js 14 App Router.
 * Fully supports RLS, session persistence, and cookie refreshing.
 */
export function createServerSupabase() {
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
          cookieStore.set({
            name,
            value,
            ...options,
            path: "/",
          });
        },
        remove(name, options) {
          cookieStore.set({
            name,
            value: "",
            ...options,
            path: "/",
            maxAge: 0,
          });
        },
      },
    }
  );
}

/** Backwards compatibility (old name) */
export const supabaseServer = createServerSupabase;
