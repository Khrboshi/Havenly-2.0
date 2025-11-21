import "../../globals.css";
import Header from "@/components/Header";
import AddToHomeScreen from "@/components/AddToHomeScreen";

export default function ProtectedLayout({ children }) {
  return (
    <div>
      <Header />
      <AddToHomeScreen />
      <main className="pt-20 max-w-3xl mx-auto px-4">{children}</main>
    </div>
  );
}
