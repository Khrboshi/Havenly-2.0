import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";
import DailyNudge from "@/components/DailyNudge";
import PremiumNudge from "@/components/PremiumNudge";
import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // 1) Get the authenticated session on the server
  const session = await getUserSession();

  // If no session → redirect to login
  if (!session?.user) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  // 2) Load user stats safely
  let stats = {
    latestMood: null,
    recentMoods: [],
    journalCount: 0,
    reflectionCount: 0,
  };

  try {
    const data = await getUserStats(userId);
    if (data) stats = data;
  } catch (e) {
    console.error("Dashboard stats error:", e);
  }

  // 3) Load mood trend (AI) safely
  let trend = null;
  try {
    trend = await getMoodTrend(userId);
  } catch (e) {
    console.error("Trend error:", e);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[#0D7A7E]">Dashboard</h1>

      <DailyNudge />

      {/* Premium prompt */}
      <PremiumNudge />

      {/* Mood Summary */}
      <div className="p-5 bg-white border rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Your Latest Mood</h2>
        {stats.latestMood ? (
          <p className="text-gray-800">
            Your most recent mood:{" "}
            <span className="font-bold">{stats.latestMood.mood}</span>
          </p>
        ) : (
          <p className="text-gray-500">No mood entries yet.</p>
        )}
      </div>

      {/* Trend Summary */}
      <div className="p-5 bg-white border rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Trend Insight</h2>
        {trend ? (
          <p className="text-gray-800">{trend.forecast}</p>
        ) : (
          <p className="text-gray-500">Not enough data to generate a trend yet.</p>
        )}
      </div>

      {/* Activity Summary */}
      <div className="p-5 bg-white border rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Your Activity</h2>
        <ul className="space-y-2 text-gray-700">
          <li>Journal entries: {stats.journalCount}</li>
          <li>Reflections: {stats.reflectionCount}</li>
          <li>Mood logs in last 14 days: {stats.recentMoods.length}</li>
        </ul>
      </div>
    </div>
  );
}
