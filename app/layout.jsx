--- FILE: app/layout.jsx ---

import "./styles.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Havenly",
  description: "Your daily emotional wellness companion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#F7FBFA] text-gray-900`}>

        {/* Global toast notifications */}
        <SonnerToaster />

        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 w-full mx-auto max-w-3xl px-4 py-6">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
