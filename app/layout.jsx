import "./globals.css";

export const metadata = {
  title: "Havenly 2.0",
  description: "A calm, mobile-first space for mental well-being."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white text-slate-800">
      <body>{children}</body>
    </html>
  );
}
