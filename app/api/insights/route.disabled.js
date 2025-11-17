import OpenAI from "openai";
import { supabase } from "../../../lib/supabase";

// Disable caching
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { text, user_id } = await req.json();

    if (!text || !user_id) {
      return new Response(
        JSON.stringify({ error: "Missing text or user_id" }),
        { status: 400 }
      );
    }

    // 1. AI summary
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const ai = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Summarize the emotional meaning of this reflection in 3–4 sentences (empathetic, simple): ${text}`
    });

    const summary = ai.output_text;

    // 2. Save to Supabase
    const { error } = await supabase.from("reflections").insert({
      user_id,
      text,
      summary
    });

    if (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ summary }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
