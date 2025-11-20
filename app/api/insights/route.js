import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req) {
  const supabase = createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const input = body.input ?? "";

  if (!input.trim()) {
    return NextResponse.json({ error: "Input required" }, { status: 400 });
  }

  // Save reflection input
  await supabase.from("insights_input").insert({
    user_id: session.user.id,
    input_text: input,
  });

  // AI response (placeholder)
  return NextResponse.json({
    success: true,
    insight: "Your insight will appear here."
  });
}
