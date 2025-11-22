// app/api/mood/route.js
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request) {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const score = body?.score;

  if (typeof score !== "number") {
    return NextResponse.json({ error: "Invalid score" }, { status: 400 });
  }

  const { error } = await supabase.from("moods").insert({
    user_id: user.id,
    score,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to save mood" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
