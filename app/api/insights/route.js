import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import OpenAI from "openai";
import { checkStreakAchievements } from "../../../lib/achievements";

export async function POST(req) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check auth
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id;

    // Parse request body
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    // Summarize with OpenAI
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize the reflection in 1–2 sentences." },
        { role: "user", content: text },
      ],
    });

    const summary =
      completion.choices?.[0]?.message?.content || "No summary generated.";

    // Save reflection
    await supabase.from("reflections").insert({
      user_id,
      summary,
    });

    // Streak count
    const { data: streakData } = await supabase
      .from("streaks")
      .select("count")
      .eq("user_id", user_id)
      .maybeSingle();

    const streakCount = streakData?.count || 1;

    // Check achievements
    const unlocked = await checkStreakAchievements(user_id, streakCount);

    return NextResponse.json({
      summary,
      achievements: unlocked,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
