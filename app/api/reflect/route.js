import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req) {
  const supabase = createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { question, answer } = body;

  if (!answer?.trim()) {
    return NextResponse.json({ error: "Answer required" }, { status: 400 });
  }

  await supabase.from("reflections").insert({
    user_id: session.user.id,
    question,
    answer,
  });

  return NextResponse.json({ success: true });
}
