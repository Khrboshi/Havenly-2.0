import { getServerSession } from "@/lib/session";
import { createServerSupabase } from "@/lib/supabase/server";

/** Reusable card */
function DashboardCard({ title, value, description }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-semibold text-[#0D7A7E] mt-2">{value}</p>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}

/** Fetch dashboard data from Supabase */
async function getDashboardData(userId) {
  const supabase = createServerSupabase();

  const [{ data: moods }, { data: journals }, { data: streaks }] =
    await Promise.all([
      supabase
        .from("moods")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(7),

      supabase
        .from("reflections")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(7),

      supabase
        .from("streaks")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle(),
    ]);

  return {
    recentMood: moods?.[0]?.mood ?? "—",
    moodCount: moods?.length ?? 0,
    journalCount: journals?.length ?? 0,
    streak: streaks?.streak ?? 0,
  };
}

export default async function DashboardPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    // Should not occur because protected layout handles redirect,
    // but we keep this as a failsafe
    return (
      <main className="p-6">
        <p className="text-sm text-gray-600">Not authenticated.</p>
      </main>
    );
  }

  const data = await getDashboardData(user.id);

  return (
    <div className="space-y-6">

      {/* Greeting */}
      <section>
        <h1 className="text-2xl font-bold text-[#0D7A7E]">
          Welcome back, {user.email.split("@")[0]}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Here’s a quick view of your recent wellbeing activity.
        </p>
      </section>

      {/* Dashboard Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DashboardCard
          title="Current Streak"
          value={data.streak}
          description="Daily reflection streak"
        />
        <DashboardCard
          title="Recent Mood"
          value={data.recentMood}
          description="Your latest mood entry"
        />
        <DashboardCard
          title="Mood Entries"
          value={data.moodCount}
          description="Past 7 days"
        />
        <DashboardCard
          title="Reflection Entries"
          value={data.journalCount}
          description="Past 7 reflections"
        />
      </section>

      {/* Quick Actions */}
      <section className="space-y-3">
        <a
          href="/mood"
          className="block bg-[#0D7A7E] text-white text-center rounded-xl py-3 font-medium shadow-sm hover:bg-[#096064] transition"
        >
          Log Today’s Mood
        </a>

        <a
          href="/reflect"
          className="block bg-white border border-[#0D7A7E] text-[#0D7A7E] text-center rounded-xl py-3 font-medium shadow-sm hover:bg-[#E6F4F3] transition"
        >
          Start a Reflection
        </a>
      </section>

      {/* Insights Preview */}
      <section>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700">AI Insights</h3>
          <p className="text-xs text-gray-500 mt-1">
            Your personal trends will appear here once you have enough entries.
          </p>

          <a
            href="/insights"
            className="inline-block mt-3 text-sm font-medium text-[#0D7A7E] underline"
          >
            View insights →
          </a>
        </div>
      </section>

    </div>
  );
}
