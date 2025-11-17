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
          }
        }
      }
    );

    const { text } = await req.json();

    if (!text) {
      return Response.json({ error: "Missing text" }, { status: 400 });
    }

    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = authData.user;

    // Call Groq
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a STRICT summarization engine.

RULES:
1. Output ONLY emotional or motivational interpretation.
2. 1–2 sentences maximum.
3. No definitions, no greetings, no advice.
4. If unclear, infer intention.

Examples:
User: "Let's get it"
Output: "You feel energized and ready to begin."
`
        },
        { role: "user", content: text }
      ]
    });

    const summary =
      completion.choices[0]?.message?.content?.trim() ||
      "Unable to generate summary.";

    // Save reflection
    await supabase.from("reflections").insert({
      user_id: user.id,
      content: text
    });

    // Save AI insight
    await supabase.from("ai_insights").insert({
      user_id: user.id,
      input_text: text,
      summary
    });

    return Response.json({ summary });
  } catch (err) {
    console.error("REFLECT API ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
