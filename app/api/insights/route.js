import { supabaseServer } from "@/lib/supabase/server";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const supabase = supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { text } = await req.json();
    if (!text) return Response.json({ error: "Missing text" }, { status: 400 });

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
Return 2 sentences:  
1. Emotional summary.  
2. One small actionable tip.`
        },
        { role: "user", content: text },
      ],
    });

    const summary = completion.choices[0].message.content.trim();

    await supabase.from("ai_insights").insert({
      user_id: user.id,
      input_text: text,
      summary,
    });

    return Response.json({ summary });
  } catch (e) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
