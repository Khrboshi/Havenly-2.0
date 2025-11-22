import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getAchievements } from "@/lib/achievements"; // updated

export async function POST() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // streak calculation
  const { data: moods } = await supabase
    .from("moods")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(7);

  const streak = moods?.length || 0;

  // achievements check
  const existing = await getAchievements(user.id);

  return NextResponse.json({ streak, achievements: existing });
}
