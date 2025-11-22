// app/(protected)/layout.jsx

import { supabaseServer } from "@/lib/supabaseServer";
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
      {/* Protected content */}
      {children}

      {/* Mobile bottom navigation (hidden on md+ inside component) */}
      <BottomNav />
    </div>
  );
}
