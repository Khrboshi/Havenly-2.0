import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req) {
  const supabase = supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mood } = await req.json();
  if (!mood) {
    return NextResponse.json({ error: "Mood required" }, { status: 400 });
  }

  await supabase.from("moods").insert({
    user_id: session.user.id,
    mood,
  });

  return NextResponse.json({ success: true });
}
