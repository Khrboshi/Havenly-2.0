import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const today = new Date().toISOString().split("T")[0];

  const { data: streak } = await supabase
    .from("streaks")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // First time ever → create streak row
  if (!streak) {
    await supabase.from("streaks").insert({
      user_id: user.id,
      current_streak: 1,
      longest_streak: 1,
      last_reflection_date: today
    });

    return new Response("OK");
  }

  const last = streak.last_reflection_date
    ? new Date(streak.last_reflection_date)
    : null;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let updatedStreak = streak.current_streak;

  if (last?.toISOString().split("T")[0] === today) {
    // Already did reflection today → do nothing
  } else if (last?.toDateString() === yesterday.toDateString()) {
    // Continue streak
    updatedStreak += 1;
  } else {
    // Streak broken
    updatedStreak = 1;
  }

  await supabase
    .from("streaks")
    .update({
      current_streak: updatedStreak,
      longest_streak: Math.max(updatedStreak, streak.longest_streak),
      last_reflection_date: today,
      updated_at: new Date()
    })
    .eq("user_id", user.id);

  return new Response("OK");
}
