import { supabaseServer } from "@/lib/supabaseServer";
import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";

export default async function DashboardPage() {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // No session (should be prevented by protected layout)
  if (!session) {
    return <div className="p-6">Please log in to view your dashboard.</div>;
  }

  const userId = session.user.id;

  // Load stats and AI trend
  const stats = await getUserStats(userId);
  const aiTrend = await getMoodTrend(userId);

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Welcome Back</h1>

      {/* Latest Mood */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Your Latest Mood</h2>
        {stats.latestMood ? (
          <p className="text-gray-700">
            You last felt:
            <span className="ml-2 font-semibold">
              {stats.latestMood.mood}
            </span>
          </p>
        ) : (
          <p className="text-gray-500">No mood entries yet.</p>
        )}
      </section>

      {/* Mood Trend (AI) */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Mood Trend (AI)</h2>
        <p className="text-gray-700">{aiTrend.forecast}</p>
      </section>

      {/* Activity Summary */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-2">Your Activity Summary</h2>
        <ul className="text-gray-700 space-y-1">
          <li>Journal Entries: {stats.journalCount}</li>
          <li>Reflections: {stats.reflectionCount}</li>
        </ul>
      </section>
    </div>
  );
}
