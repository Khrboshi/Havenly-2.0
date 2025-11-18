import { safeGroq } from "@/lib/groq";
import { logError } from "@/lib/errors";

/**
 * Analyze a journal entry and return:
 * - summary
 * - sentiment
 * - keywords
 */
export async function analyzeJournalEntry(text) {
  try {
    const prompt = `
You are an expert mental health assistant. Analyze the following journal text:

"${text}"

Return a JSON object like this:

{
  "summary": "short summary",
  "sentiment": "positive | neutral | negative",
  "keywords": ["keyword1", "keyword2"]
}
`;

    const response = await safeGroq(prompt);

    try {
      return JSON.parse(response);
    } catch {
      return {
        summary: "Unable to analyze text.",
        sentiment: "neutral",
        keywords: [],
      };
    }
  } catch (e) {
    logError("AI Journal Analysis Error", e);
    return {
      summary: "Error analyzing text.",
      sentiment: "neutral",
      keywords: [],
    };
  }
}

/**
 * Predict the user's mood trend using their recent mood history.
 */
export async function predictMoodTrend(moodHistory) {
  try {
    const prompt = `
You are an emotional wellness AI.
Analyze the following mood scores:

${JSON.stringify(moodHistory)}

Return a JSON object:

{
  "forecast": "1–2 sentence prediction"
}
`;

    const response = await safeGroq(prompt);

    try {
      return JSON.parse(response);
    } catch {
      return {
        forecast: "Unable to generate prediction.",
      };
    }
  } catch (e) {
    logError("AI Trend Prediction Error", e);
    return {
      forecast: "Trend prediction unavailable.",
    };
  }
}
