// app/(protected)/insights/page.jsx
import { supabaseServer } from "@/lib/supabase/server";
import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";
import Card from "@/components/ui/Card";
import MoodChart from "@/components/MoodChart";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-[#0D7A7E]">Insights</h1>
        <p className="text-gray-600">
          You need to be logged in to see your personal insights.
        </p>
      </div>
    );
  }

  const stats = await getUserStats();
  const aiTrend = await getMoodTrend();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-[#0D7A7E]">Your insights</h1>
        <p className="text-sm text-gray-600">
          A simple overview of how your moods and reflections are evolving.
        </p>
      </header>

      <Card>
        <h2 className="font-semibold text-lg mb-1">Latest mood</h2>
        {stats.latestMood ? (
          <p className="text-gray-700">
            Your most recent mood is{" "}
            <span className="font-semibold text-[#0D7A7E]">
              {stats.latestMood.score} / 5
            </span>
            .
          </p>
        ) : (
          <p className="text-gray-500 text-sm">
            No mood entries yet. Try logging a mood today to get started.
          </p>
        )}
      </Card>

      <Card>
        <h2 className="font-semibold text-lg mb-2">Mood trend (AI)</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {aiTrend?.forecast ??
            "Once you have more data, Havenly will summarise your emotional trend here."}
        </p>
      </Card>

      <Card>
        <h2 className="font-semibold text-lg mb-2">Mood history</h2>
        <MoodChart moods={stats.recentMoods ?? []} />
      </Card>

      <Card>
        <h2 className="font-semibold text-lg mb-2">Activity summary</h2>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>Journal entries: {stats.journalCount ?? 0}</li>
          <li>Reflections completed: {stats.reflectionCount ?? 0}</li>
        </ul>
      </Card>
    </div>
  );
}
