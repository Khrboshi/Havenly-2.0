// /app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Havenly 2.0",
  description: "A calm space for daily mindful reflection.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
