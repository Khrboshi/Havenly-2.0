import "../styles.css"; // Correct path
import AddToHomeScreen from "@/components/AddToHomeScreen";
import Navbar from "@/components/Navbar";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      <AddToHomeScreen />
      <main>{children}</main>
    </>
  );
}
