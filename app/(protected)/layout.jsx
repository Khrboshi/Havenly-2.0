import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Havenly – Dashboard",
  description: "Protected area for your reflections, mood logs, insights and profile.",
};

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession();

  // Not logged in → redirect to login
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-bg)]">

      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 pb-28 fade-in">
        {children}
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
