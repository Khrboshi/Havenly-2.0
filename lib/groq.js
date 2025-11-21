import Groq from "groq-sdk";
import { logError } from "./errors";

export const groq = new Groq({
  // For now we keep the public env var you already configured.
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

/**
 * Safe wrapper for AI calls.
 * Always returns a string and never throws.
 */
export async function safeGroq(prompt, temp = 0.5) {
  try {
    const res = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: temp,
    });

    return res.choices[0]?.message?.content || "";
  } catch (e) {
    logError("Groq API Error", e);
    return "AI is temporarily unavailable. Please try again later.";
  }
}
