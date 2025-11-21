export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function InsightsPage() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark">AI Insights</h1>
      <p className="text-sm text-gray-600">
        Your trends and AI insights will appear here.
      </p>
    </div>
  );
}
