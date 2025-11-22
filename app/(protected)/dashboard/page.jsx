// app/(protected)/dashboard/page.jsx
import { supabaseServer } from "@/lib/supabase/server";
import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";
import MoodChart from "@/components/MoodChart";
import DailyNudge from "@/components/DailyNudge";
import PremiumNudge from "@/components/PremiumNudge";
import Card from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#0D7A7E]">Dashboard</h1>
        <p className="text-gray-600">
          Please log in to view your dashboard.
        </p>
      </div>
    );
  }

  const displayName =
    session.user.user_metadata?.full_name ??
    session.user.email?.split("@")[0] ??
    "there";

  const stats = await getUserStats();
  const aiTrend = await getMoodTrend();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-[#0D7A7E]">
          Welcome back, {displayName}
        </h1>
        <p className="text-sm text-gray-600">
          Here is a gentle snapshot of how you have been doing lately.
        </p>
      </header>

      <DailyNudge message="Small, consistent check-ins with yourself make the biggest difference over time." />

      {/* Latest mood */}
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
            You have not logged any moods yet. Try logging today’s mood to
            start building your history.
          </p>
        )}
      </Card>

      {/* Streak */}
      <Card>
        <h2 className="font-semibold text-lg mb-1">Daily streak</h2>
        <p className="text-gray-700">
          You have checked in for{" "}
          <span className="font-semibold text-[#0D7A7E]">
            {stats.streak ?? 0}{" "}
            {stats.streak === 1 ? "day" : "days"}
          </span>{" "}
          in a row.
        </p>
      </Card>

      {/* Mood trend chart */}
      <Card>
        <h2 className="font-semibold text-lg mb-2">Recent mood history</h2>
        <MoodChart moods={stats.recentMoods ?? []} />
      </Card>

      {/* AI forecast */}
      <Card>
        <h2 className="font-semibold text-lg mb-1">Mood trend (AI)</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {aiTrend?.forecast ??
            "Once you have a few days of check-ins, Havenly will summarise your emotional trend here."}
        </p>
      </Card>

      {/* Activity summary + premium nudge */}
      <Card>
        <h2 className="font-semibold text-lg mb-2">Activity summary</h2>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>Journal entries: {stats.journalCount ?? 0}</li>
          <li>Reflections completed: {stats.reflectionCount ?? 0}</li>
          <li>Mood check-ins (last 14 days): {stats.recentMoods?.length ?? 0}</li>
        </ul>
        <PremiumNudge />
      </Card>
    </div>
  );
}
