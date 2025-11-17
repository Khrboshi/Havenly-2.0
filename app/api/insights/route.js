import { supabase } from "../../../lib/supabase";
import OpenAI from "openai";

export async function POST(req) {
  try {
    // Parse request body
    const { text } = await req.json();
    if (!text) {
      return Response.json({ error: "Missing text" }, { status: 400 });
    }

    // Get user from Supabase server-side
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.error("User fetch failed:", userError);
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = userData.user.id;

    // OpenAI summary
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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
    const { error: insertError } = await supabase
      .from("reflections")
      .insert({ user_id, summary, input_text: text });

    if (insertError) {
      console.error("DB Insert Error:", insertError);
      return Response.json({ error: "Insert error" }, { status: 500 });
    }

    return Response.json({ summary });
  } catch (err) {
    console.error("[INSIGHTS API ERROR]", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
