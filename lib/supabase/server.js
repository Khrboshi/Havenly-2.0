import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * NEW unified Supabase server client for all server components & API routes.
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
          cookieStore.set(name, value, options);
        },
        remove(name, options) {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );
}

/**
 * OLD name — kept for backward compatibility.
 * Files still importing supabaseServer() will work.
 */
export function supabaseServer() {
  return createServerSupabase();
}
