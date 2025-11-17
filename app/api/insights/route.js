import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const cookieStore = cookies();

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

    // Read input
    const { text } = await req.json();
    if (!text) {
      return Response.json({ error: "Missing text" }, { status: 400 });
    }

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // LLM client
    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // LLM summary prompt
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
3. Must be 1–2 sentences.
4. DO NOT explain meanings or give dictionary-style definitions.
5. DO NOT greet, ask questions, or give advice.
6. ONLY summarize the user's text.
`
        },
        { role: "user", content: text },
      ],
    });

    const summary =
      completion.choices?.[0]?.message?.content?.trim() ||
      "No summary generated.";

    // Insert into Supabase table
    const { error: insertError } = await supabase
      .from("ai_insights")
      .insert({
        user_id: user.id,
        summary,
        input_text: text,
      });

    if (insertError) {
      return Response.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return Response.json({ summary });
  } catch (err) {
    console.error("INSIGHTS API ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
