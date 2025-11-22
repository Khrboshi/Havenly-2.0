import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";

export default async function InsightsPage() {
  const stats = await getUserStats();
  const aiTrend = await getMoodTrend();

  const latestLabel =
    stats?.latestMood?.mood ??
    (stats?.latestMood?.score != null
      ? `${stats.latestMood.score} / 5`
      : null);

  return (
    <div className="space-y-8 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Insights</h1>

      {/* Latest Mood */}
      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">Latest Mood</h2>
        {latestLabel ? (
          <p className="text-gray-700">
            Your most recent mood:
            <span className="ml-2 font-semibold text-[#0D7A7E]">
              {latestLabel}
            </span>
          </p>
        ) : (
          <p className="text-gray-500">You haven’t logged any moods.</p>
        )}
      </section>

      {/* AI Trend */}
      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">AI Trend</h2>
        <p className="text-gray-700">
          {aiTrend?.forecast || "AI has no trend for you yet."}
        </p>
      </section>

      {/* Summary */}
      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">Activity Summary</h2>
        <ul className="text-gray-700 space-y-1">
          <li>Journal Entries: {stats.journalCount}</li>
          <li>Reflections: {stats.reflectionCount}</li>
          <li>Recent Moods: {stats.recentMoods.length}</li>
        </ul>
      </section>
    </div>
  );
}
