import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { checkStreakAchievements } from "@/lib/achievements";

export async function POST(req) {
  const supabase = supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();

  // Must be authenticated
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { streak } = await req.json();

  if (typeof streak !== "number") {
    return NextResponse.json({ error: "Invalid streak value" }, { status: 400 });
  }

  // Upsert streak for the user
  const { error } = await supabase.from("streaks").upsert({
    user_id: session.user.id,
    streak,
  });

  if (error) {
    console.error("Streak upsert error:", error);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  // Check if user unlocks achievements
  const unlocked = await checkStreakAchievements(session.user.id, streak);

  return NextResponse.json({ success: true, unlocked });
}
