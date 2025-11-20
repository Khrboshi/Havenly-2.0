import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req) {
  const supabase = supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();

  // Must be authenticated
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { input } = await req.json();

  if (!input?.trim()) {
    return NextResponse.json({ error: "Input required" }, { status: 400 });
  }

  // Save the user's insight input (to be processed later)
  const { error } = await supabase.from("insights_input").insert({
    user_id: session.user.id,
    input_text: input,
  });

  if (error) {
    console.error("Insight insert error:", error);
    return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
  }

  // Placeholder for AI processing
  return NextResponse.json({
    success: true,
    insight: "Your insight will appear here once AI processing is enabled."
  });
}
