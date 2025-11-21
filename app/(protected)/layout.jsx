export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function ProtectedLayout({ children }) {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 pb-28">
        {children}
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
}
