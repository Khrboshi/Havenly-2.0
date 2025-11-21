import Navbar from "@/components/Navbar";
import "../styles.css";

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7FBFA]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
