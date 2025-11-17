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

    const { text } = await req.json();
    if (!text) {
      return Response.json({ error: "Missing text" }, { status: 400 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user || authError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
Return a **short emotional summary** and **1 small actionable step**.
Rules:
- Max 2 sentences.
- 1st: describe emotional state.
- 2nd: give a real actionable micro-step.
- No questions, no long text.
`
        },
        { role: "user", content: text }
      ],
    });

    const summary =
      completion.choices?.[0]?.message?.content?.trim() ??
      "No summary generated.";

    const { error: insertError } = await supabase
      .from("ai_insights")
      .insert({
        user_id: user.id,
        input_text: text,
        summary,
      });

    if (insertError) {
      console.error("DB Insert Error:", insertError);
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    return Response.json({ summary });

  } catch (err) {
    console.error("INSIGHTS API ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
