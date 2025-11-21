import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req) {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const rawMood = body?.score ?? body?.mood;

  // Normalize to a number
  const score = Number(rawMood);

  if (!Number.isFinite(score)) {
    return NextResponse.json({ error: "Valid mood score required" }, { status: 400 });
  }

  const { error } = await supabase.from("moods").insert({
    user_id: session.user.id,
    score,
  });

  if (error) {
    console.error("Mood insert error:", error);
    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
