export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-teal-700">
        Welcome back, {user.email?.split("@")[0]}
      </h1>

      <p className="text-gray-600">
        Your personalized wellbeing overview.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <a
          href="/journal"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md border"
        >
          <h2 className="font-bold text-teal-700 mb-2">Daily Journal</h2>
          <p className="text-sm text-gray-600">
            Write your reflection for today.
          </p>
        </a>

        <a
          href="/mood"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md border"
        >
          <h2 className="font-bold text-teal-700 mb-2">Mood Tracking</h2>
          <p className="text-sm text-gray-600">
            Log how you feel in seconds.
          </p>
        </a>

        <a
          href="/insights"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md border"
        >
          <h2 className="font-bold text-teal-700 mb-2">Insights</h2>
          <p className="text-sm text-gray-600">
            Your trends at a glance.
          </p>
        </a>
      </div>
    </div>
  );
}
