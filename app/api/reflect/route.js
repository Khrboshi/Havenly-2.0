// app/api/reflect/route.js
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
  const text = body?.text;

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Invalid reflection" }, { status: 400 });
  }

  const { error } = await supabase.from("reflections").insert({
    user_id: user.id,
    text,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to save reflection" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
