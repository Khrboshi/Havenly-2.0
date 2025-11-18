import Groq from "groq-sdk";
import { logError } from "./errors";

export const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function askGroq(prompt, temp = 0.4) {
  try {
    const res = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: temp,
    });

    return res.choices[0]?.message?.content || "";
  } catch (e) {
    logError("Groq API Error", e);
    return "";
  }
}
