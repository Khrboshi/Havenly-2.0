import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { checkStreakAchievements } from "@/lib/achievements";

export async function POST(req) {
  const supabase = createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { streak } = await req.json();

  await supabase.from("streaks").upsert({
    user_id: session.user.id,
    streak,
  });

  const unlocked = await checkStreakAchievements(session.user.id, streak);

  return NextResponse.json({ success: true, unlocked });
}
