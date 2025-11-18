import { supabaseServer } from "@/lib/supabaseServer";
import { getMoodTrend } from "@/modules/ai/actions";
import { getUserStats } from "@/modules/data/stats";

export default async function InsightsPage() {
  // Load Supabase session
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <div className="p-6">You must be logged in to view Insights.</div>;
  }

  const userId = session.user.id;

  // Load mood stats
  const stats = await getUserStats(userId);

  // Load AI trend
  const aiTrend = await getMoodTrend(userId);

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Your Insights</h1>

      {/* Latest Mood */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Latest Mood</h2>
        {stats.latestMood ? (
          <p className="text-gray-700">
            Your most recent mood was:
            <span className="font-semibold ml-2">{stats.latestMood.mood}</span>
          </p>
        ) : (
          <p className="text-gray-500">No mood entries yet.</p>
        )}
      </section>

      {/* Mood Trend */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Mood Trend (AI)</h2>
        <p className="text-gray-700">{aiTrend.forecast}</p>
      </section>

      {/* Journal & Reflection Stats */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Activity Summary</h2>
        <ul className="text-gray-700 space-y-1">
          <li>Journal Entries: {stats.journalCount}</li>
          <li>Reflections Completed: {stats.reflectionCount}</li>
        </ul>
      </section>
    </div>
  );
}
