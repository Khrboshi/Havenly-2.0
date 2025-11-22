--- FILE: app/(protected)/layout.jsx ---

import { supabaseServer } from "@/lib/supabaseServer.js";
import { redirect } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default async function ProtectedLayout({ children }) {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen w-full pb-20">
      {children}

      {/* Mobile bottom navigation */}
      <BottomNav />
    </div>
  );
}
