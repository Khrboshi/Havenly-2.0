// app/(protected)/dashboard/page.jsx
export const dynamic = "force-dynamic";

import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";
import MoodChart from "@/components/MoodChart";

export default async function DashboardPage() {
  const stats = await getUserStats();
  const aiTrend = await getMoodTrend();

  const latestScore =
    stats?.latestMood?.score ??
    stats?.latestMood?.mood ??
    null;

  return (
    <div className="space-y-8 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Welcome Back</h1>

      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">Your Latest Mood</h2>
        {latestScore != null ? (
          <p className="text-gray-700">
            Latest mood:
            <span className="ml-2 font-semibold text-[#0D7A7E]">
              {latestScore}
            </span>
          </p>
        ) : (
          <p className="text-gray-500">No mood entries yet.</p>
        )}
      </section>

      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">Daily Streak</h2>
        <p className="text-gray-700">
          <span className="font-semibold text-[#0D7A7E]">
            {stats.streak}
          </span>{" "}
          {stats.streak === 1 ? "day" : "days"} in a row.
        </p>
      </section>

      <section className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="font-semibold text-lg">Mood Trend</h2>
        <MoodChart moods={stats.recentMoods} />
        <p className="text-gray-700">
          {aiTrend?.forecast || "No trend available yet."}
        </p>
      </section>

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
