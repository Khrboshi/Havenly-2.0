import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";

export default async function InsightsPage() {
  const stats = await getUserStats();
  const aiTrend = await getMoodTrend();

  const latestMoodLabel =
    stats?.latestMood?.mood ??
    (stats?.latestMood?.score != null
      ? `${stats.latestMood.score} / 5`
      : null);

  return (
    <div className="space-y-8 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Your Insights</h1>

      {/* Latest Mood */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Latest Mood</h2>
        {latestMoodLabel ? (
          <p className="text-gray-700">
            Your most recent mood was:
            <span className="font-semibold ml-2">{latestMoodLabel}</span>
          </p>
        ) : (
          <p className="text-gray-500">No mood entries yet.</p>
        )}
      </section>

      {/* Mood Trend (AI) */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Mood Trend (AI)</h2>
        <p className="text-gray-700">
          {aiTrend?.forecast || "No AI mood trend is available yet."}
        </p>
      </section>

      {/* Journal & Reflection Stats */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Activity Summary</h2>
        <ul className="text-gray-700 space-y-1">
          <li>Journal Entries: {stats?.journalCount ?? 0}</li>
          <li>Reflections Completed: {stats?.reflectionCount ?? 0}</li>
          <li>Recent Mood Entries: {stats?.recentMoods?.length ?? 0}</li>
        </ul>
      </section>
    </div>
  );
}
