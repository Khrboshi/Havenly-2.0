import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function POST() {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
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

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await supabase.rpc("increment_streak", { uid: user.id });

    return Response.json({ success: true });
  } catch (err) {
    console.error("STREAK UPDATE ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
