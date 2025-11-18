import { supabaseServer } from "@/lib/supabaseServer";
import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  // Load authenticated session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="p-6 text-gray-600">
        Please log in to view your dashboard.
      </div>
    );
  }

  // Load stats (user ID auto-extracted internally)
  const stats = await getUserStats();

  // Load AI mood trend
  const aiTrend = await getMoodTrend();

  return (
    <div className="space-y-8 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Welcome Back</h1>

      {/* Latest Mood */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Your Latest Mood</h2>

        {stats.latestMood ? (
          <p className="text-gray-700">
            Your latest recorded mood is:
            <span className="ml-2 font-semibold text-[#0D7A7E]">
              {stats.latestMood.score} / 5
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
          You have logged moods for:
          <span className="ml-2 font-semibold text-[#0D7A7E]">
            {stats.streak} {stats.streak === 1 ? "day" : "days"}
          </span>
          {" "}in a row.
        </p>
      </section>

      {/* Mood Trend (AI Forecast) */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Mood Trend (AI)</h2>
        <p className="text-gray-700">
          {aiTrend?.forecast || "No AI trend available yet."}
        </p>
      </section>

      {/* Activity Summary */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Your Activity Summary</h2>

        <ul className="text-gray-700 space-y-1">
          <li>Journal Entries: {stats.journalCount}</li>
          <li>Reflections: {stats.reflectionCount}</li>
          <li>Mood Entries (14 days): {stats.recentMoods.length}</li>
        </ul>
      </section>
    </div>
  );
}
