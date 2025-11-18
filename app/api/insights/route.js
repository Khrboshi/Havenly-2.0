import { createSupabaseServer } from "@/lib/supabase";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const supabase = createSupabaseServer();

    const { text } = await req.json();
    if (!text) return Response.json({ error: "Missing text" }, { status: 400 });

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (!user || authError)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    // AI engine
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Return a 1–2 sentence emotional summary and one actionable tip."
        },
        { role: "user", content: text }
      ]
    });

    const summary =
      completion.choices?.[0]?.message?.content?.trim() ||
      "No summary generated.";

    const { error: insertError } = await supabase
      .from("ai_insights")
      .insert({ user_id: user.id, input_text: text, summary });

    if (insertError)
      return Response.json({ error: insertError.message }, { status: 500 });

    return Response.json({ summary });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
