import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession();
  if (!session?.user) redirect("/auth/login");

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-xl mx-auto px-5 py-8 pb-32 fade-in">
        {children}
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
