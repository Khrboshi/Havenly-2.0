// app/(protected)/layout.jsx
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }) {
  const supabase = supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/auth/login");

  return (
    <div className="min-h-screen w-full pb-20">
      {children}
      <BottomNav />
    </div>
  );
}
