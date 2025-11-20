import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { ACHIEVEMENTS } from "@/lib/achievements";

/** Load unlocked achievements */
async function loadUnlockedAchievements(userId) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("achievements")
    .select("achievement_key, unlocked_at")
    .eq("user_id", userId);

  if (error) {
    console.error("Achievement load error:", error);
    return [];
  }

  return data || [];
}

export default async function AchievementsPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  const unlocked = await loadUnlockedAchievements(userId);

  // Convert to a Set for fast lookup
  const unlockedSet = new Set(unlocked.map((a) => a.achievement_key));

  return (
    <div className="space-y-8">

      {/* Header */}
      <section>
        <h1 className="text-2xl font-bold text-[#0D7A7E]">Achievements</h1>
        <p className="text-sm text-gray-600 mt-1">
          Your progress and milestones.
        </p>
      </section>

      {/* Grid of Achievements */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedSet.has(ach.key);

          return (
            <div
              key={ach.key}
              className={`rounded-xl border p-4 shadow-sm transition ${
                isUnlocked
                  ? "bg-white border-[#0D7A7E]"
                  : "bg-gray-100 border-gray-300 opacity-70"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {isUnlocked ? ach.emoji : "🔒"}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    {ach.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">{ach.description}</p>
                </div>
              </div>

              {isUnlocked && (
                <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-md p-2 mt-3">
                  Unlocked
                </p>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
