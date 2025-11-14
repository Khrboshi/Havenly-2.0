import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "../../../lib/supabase";

export async function POST(req) {
  try {
    const { user_id, text } = await req.json();

    if (!user_id || !text) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Initialize OpenAI (from Vercel environment)
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Request AI insight
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a mental health assistant." },
        {
          role: "user",
          content:
            "Summarize the following reflection and give one helpful recommendation:\n\n" +
            text,
        },
      ],
    });

    const aiText = completion.choices[0].message.content;

    // Split into summary and recommendation
    const [summary, recommendation] = aiText.split("Recommendation:");

    // Save to Supabase
    const { data, error } = await supabase
      .from("ai_insights")
      .insert({
        user_id,
        source: "reflection",
        input_text: text,
        ai_summary: summary.trim(),
        ai_recommendation: recommendation
          ? recommendation.trim()
          : "No recommendation provided.",
      })
      .select();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Database insert failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, insight: data[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
