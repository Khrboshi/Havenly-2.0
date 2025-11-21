// app/(protected)/layout.jsx
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import AddToHomeScreen from "@/components/AddToHomeScreen";
import "@/styles/globals.css";
import { createServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic"; // ⬅ Prevents static caching

export default async function ProtectedLayout({ children }) {
  const supabase = await createServerSupabase(); // ⬅ MUST be awaited
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Not logged in → redirect
  if (!session) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-600">
        <p>Redirecting...</p>
        {(() => {
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        })()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">{children}</main>
      <BottomNav />
      <AddToHomeScreen />
    </div>
  );
}
