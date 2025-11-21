export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // FIX: Must await this call
  const supabase = await createServerSupabase();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Supabase session error:", error);
  }

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">
        Welcome back, {user.email?.split("@")[0]}
      </h1>
      <p className="text-sm text-gray-600">Your wellbeing overview.</p>
    </div>
  );
}
