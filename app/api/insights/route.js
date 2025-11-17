import { cookies } from "next/headers";
import OpenAI from "openai";
import { createServerClient } from "@supabase/ssr";

export async function POST(req) {
  try {
    // Create authenticated server-side Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies }
    );

    // Parse body
    const { text } = await req.json();
    if (!text) {
      return Response.json({ error: "Missing text" }, { status: 400 });
    }

    // Get authenticated user from cookies
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = user.id;

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
    await supabase.from("reflections").insert({
      user_id,
      summary,
      input_text: text,
    });

    return Response.json({ summary });
  } catch (err) {
    console.error("[INSIGHTS API ERROR]", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
