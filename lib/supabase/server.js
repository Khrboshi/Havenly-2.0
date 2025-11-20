"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Creates a Supabase server client bound to Next.js Server Context.
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
