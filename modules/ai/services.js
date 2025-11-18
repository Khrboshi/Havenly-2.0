import { askGroq } from "@/lib/groq";
import { logError } from "@/lib/errors";

/**
 * Analyze a journal entry and return:
 * - sentiment
 * - summary
 * - keywords
 */
export async function analyzeJournalEntry(text) {
  try {
    const prompt = `
You are an expert mental health assistant. Analyze the following journal text:

"${text}"

Return a JSON object with:
{
  "summary": "short summary",
  "sentiment": "positive | neutral | negative",
  "keywords": ["keyword1", "keyword2"]
}
    `;

    const response = await askGroq(prompt);

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
 * Predict the user's emotional trend from mood history
 */
export async function predictMoodTrend(moodHistory) {
  try {
    const prompt = `
You are an emotional wellness AI.
Analyze the following mood scores:

${JSON.stringify(moodHistory)}

Return a JSON response:
{
  "forecast": "short prediction (1–2 sentences)"
}
    `;

    const response = await askGroq(prompt);

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
