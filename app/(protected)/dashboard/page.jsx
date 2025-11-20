export const dynamic = "force-dynamic";

import { supabaseServer } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">
        Welcome back, {user?.email?.split("@")[0]}
      </h1>
      <p className="text-sm text-gray-600">Your wellbeing overview.</p>
    </div>
  );
}
