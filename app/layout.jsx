import "./globals.css";
import BottomNav from "../components/BottomNav";

export const metadata = {
  title: "Havenly 2.0",
  description: "A calm space for daily mindful reflection.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800 pb-20">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
