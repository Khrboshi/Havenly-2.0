import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const cookieStore = cookies();

    // Supabase client (server-side)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
          remove(name, options) {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          },
        },
      }
    );

    // Extract input text
    const { text } = await req.json();
    if (!text) {
      return Response.json({ error: "Missing text" }, { status: 400 });
    }

    // Check user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // AI
    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a STRICT summarization engine.

OUTPUT RULES:
1. Only produce a summary.
2. Summary must describe the user's emotional state, motivation, or intention.
3. Summary must be 1–2 sentences.
4. DO NOT define phrases, explain meanings, interpret idioms literally, or give dictionary-style responses.
5. DO NOT greet, ask questions, or give advice.
6. ONLY summarise the user's text as a feeling, intention, or emotional signal.
          `
        },
        { role: "user", content: text }
      ],
    });

    const summary =
      completion.choices?.[0]?.message?.content?.trim() ||
      "No summary generated.";

    // INSERT INTO THE CORRECT TABLE
    const { error: insertError } = await supabase.from("ai_insights").insert({
      user_id: user.id,
      summary: summary,
      input_text: text
    });

    if (insertError) {
      console.error("DB Insert Error:", insertError);
      return Response.json(
        { error: "Database insert failed", details: insertError.message },
        { status: 500 }
      );
    }

    return Response.json({ summary });
  } catch (err) {
    console.error("[INSIGHTS API ERROR]", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
