import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { mood } = await req.json();

    if (!mood) {
      return Response.json({ error: "Missing mood" }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: { getAll: () => cookieStore.getAll() }
      }
    );

    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await supabase.from("moods").insert({
      user_id: authData.user.id,
      mood
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("MOOD API ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
