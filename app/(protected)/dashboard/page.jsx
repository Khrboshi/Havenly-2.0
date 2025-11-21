export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#0D7A7E]">
        Welcome back, {user.email?.split("@")[0]}
      </h1>

      <p className="text-gray-600 text-sm">
        Your personalized wellbeing overview.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-[#0D7A7E]">Daily Journal</h2>
          <p className="text-sm text-gray-600">Write your reflection for today.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-[#0D7A7E]">Mood Tracking</h2>
          <p className="text-sm text-gray-600">Log how you feel in seconds.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-[#0D7A7E]">Insights</h2>
          <p className="text-sm text-gray-600">Your trends at a glance.</p>
        </div>
      </div>
    </div>
  );
}
