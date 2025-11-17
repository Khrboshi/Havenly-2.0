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

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a summarization engine. OUTPUT RULES: (1) Only return a summary. (2) Summary must be 1–2 sentences. (3) Do NOT explain, define, greet, or ask questions. (4) Do NOT add context. (5) Do NOT respond conversationally. (6) ONLY summarize the user's text."
        },
        { role: "user", content: text },
      ],
    });

    const summary =
      completion.choices?.[0]?.message?.content?.trim() ||
      "No summary generated.";

    await supabase.from("reflections").insert({
      user_id: user.id,
      summary,
      input_text: text,
    });

    return Response.json({ summary });
  } catch (err) {
    console.error("[INSIGHTS API ERROR]", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
