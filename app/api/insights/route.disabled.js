import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import OpenAI from "openai";

export async function POST(req) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user_id = session.user.id;
  const { text } = await req.json();

  // Call OpenAI
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const ai = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize the user's reflection briefly." },
      { role: "user", content: text },
    ],
  });

  const summary = ai.choices[0].message.content;

  // Store in DB
  await supabase.from("reflections").insert({
    user_id,
    content: text,
    summary,
  });

  return NextResponse.json({ summary });
}
