import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req) {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // User not logged in
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request body
  const { question, answer } = await req.json();

  if (!answer || !answer.trim()) {
    return NextResponse.json({ error: "Answer required" }, { status: 400 });
  }

  const { error } = await supabase.from("reflections").insert({
    user_id: session.user.id,
    question: question || null,
    answer,
  });

  if (error) {
    console.error("Reflection insert error:", error);
    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
