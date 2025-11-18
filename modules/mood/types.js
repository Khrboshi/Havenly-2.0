export const MoodEntryType = {
  score: "number",
  created_at: "string (ISO date)",
};

export const MoodHistoryType = {
  moods: "Array<MoodEntryType>",
};
