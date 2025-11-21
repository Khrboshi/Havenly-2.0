import "../styles.css";
import Navbar from "@/components/Navbar";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }) {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#F7FBFA]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
