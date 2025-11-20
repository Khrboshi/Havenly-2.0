export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export default async function MoodPage() {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Log Your Mood</h1>
    </div>
  );
}
