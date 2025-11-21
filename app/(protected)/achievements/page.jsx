export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { ACHIEVEMENTS } from "@/lib/achievements";

export default async function AchievementsPage() {
  const supabase = createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("achievements")
    .select("achievement_key")
    .eq("user_id", userId);

  if (error) {
    console.error("Load achievements error:", error);
  }

  const unlocked = new Set(data?.map((a) => a.achievement_key) || []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Achievements</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlocked.has(ach.key);
          return (
            <div
              key={ach.key}
              className={`p-4 rounded-xl border shadow-sm ${
                isUnlocked ? "bg-white border-[#0D7A7E]" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {isUnlocked ? ach.emoji : "🔒"}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{ach.title}</h3>
                  <p className="text-xs text-gray-500">{ach.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
