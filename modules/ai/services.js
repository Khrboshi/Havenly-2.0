"use server";

import { safeGroq } from "@/lib/groq";

/**
 * General-purpose AI helper for generating text responses.
 * Used for journal insights, reflection guidance, etc.
 */
export async function generateAIResponse(prompt) {
  try {
    const result = await safeGroq(prompt);

    if (!result || typeof result !== "string") {
      return "Unable to generate a response.";
    }

    return result.trim();
  } catch (error) {
    console.error("AI response error:", error);
    return "AI service is temporarily unavailable.";
  }
}
