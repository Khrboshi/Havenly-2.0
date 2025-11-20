import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import "../styles.css";

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#F7FBFA] flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 pb-28">
        {children}
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
