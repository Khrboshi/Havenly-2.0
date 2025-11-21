import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import AddToHomeScreen from "@/components/AddToHomeScreen";

export default function ProtectedLayout({ children }) {
  return (
    <div>
      <Navbar />
      <AddToHomeScreen />
      <main className="pt-20 max-w-3xl mx-auto px-4">{children}</main>
    </div>
  );
}
