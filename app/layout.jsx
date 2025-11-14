// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Havenly 2.0",
  description: "A calm space for mindful reflection",
  viewport: "width=device-width, initial-scale=1",
  charset: "utf-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
