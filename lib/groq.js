import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY
});

// safely query Groq with auto-error handling
export async function askGroq(prompt) {
  try {
    const res = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: 0.4
    });

    return res.choices[0]?.message?.content || "";
  } catch (e) {
    console.error("GROQ ERROR:", e);
    return "";
  }
}
