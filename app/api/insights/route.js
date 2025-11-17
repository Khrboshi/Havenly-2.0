import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
        }
      }
    );

    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return Response.json({ insights: [] });
    }

    const user = authData.user;

    const { data: insights, error } = await supabase
      .from("ai_insights")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("INSIGHTS ERROR:", error);
      return Response.json({ insights: [] });
    }

    return Response.json({ insights });
  } catch (err) {
    console.error("INSIGHTS API ERROR:", err);
    return Response.json({ insights: [] });
  }
}
