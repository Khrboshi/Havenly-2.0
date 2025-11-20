import { cookies } from "next/headers";
import { createServerClient } from "@supabase/supabase-js";

export function supabaseServer() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        storage: {
          getItem(key) {
            return cookieStore.get(key)?.value ?? null;
          },
          setItem(key, value) {
            cookieStore.set(key, value, { path: "/" });
          },
          removeItem(key) {
            cookieStore.delete(key);
          },
        },
      },
    }
  );
}
