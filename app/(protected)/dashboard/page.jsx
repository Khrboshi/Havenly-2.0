import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";
import MoodChart from "@/components/MoodChart";

export default async function DashboardPage() {
  const stats = await getUserStats();
  const aiTrend = await getMoodTrend();

  const latestScore =
    stats?.latestMood?.score ?? stats?.latestMood?.mood ?? null;

  return (
    <div className="space-y-8 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Welcome Back</h1>

      {/* Latest Mood */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Your Latest Mood</h2>

        {latestScore != null ? (
          <p className="text-gray-700">
            Your latest recorded mood is:
            <span className="ml-2 font-semibold text-[#0D7A7E]">
              {latestScore} / 5
            </span>
          </p>
        ) : (
          <p className="text-gray-500">You haven’t logged any moods yet.</p>
        )}
      </section>

      {/* Mood Streak */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Daily Streak</h2>
        <p className="text-gray-700">
          You have logged moods for
          <span className="ml-2 font-semibold text-[#0D7A7E]">
            {stats?.streak ?? 0}{" "}
            {(stats?.streak ?? 0) === 1 ? "day" : "days"}
          </span>{" "}
          in a row.
        </p>
      </section>

      {/* Mood Trend (chart + AI text) */}
      <section className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="font-semibold text-lg">Mood Trend</h2>
        <MoodChart moods={stats?.recentMoods ?? []} />
        <p className="text-gray-700 text-sm">
          {aiTrend?.forecast || "No AI mood trend available yet."}
        </p>
      </section>

      {/* Activity Summary */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Your Activity Summary</h2>

        <ul className="text-gray-700 space-y-1">
          <li>Journal Entries: {stats?.journalCount ?? 0}</li>
          <li>Reflections: {stats?.reflectionCount ?? 0}</li>
          <li>Mood Entries (recent): {stats?.recentMoods?.length ?? 0}</li>
        </ul>
      </section>
    </div>
  );
}
