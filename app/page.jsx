"use client";

import Link from "next/link";
import AddToHomeScreen from "@/components/AddToHomeScreen";

export default function Home() {
  return (
    <>
      {/* PWA Add-to-Home-Screen popup */}
      <AddToHomeScreen />

      {/* Main UI */}
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

        <h1 className="text-4xl font-semibold mb-6">
          Welcome to <span className="text-primary">Havenly</span>
        </h1>

        <p className="text-slate-600 max-w-md mb-8">
          A calm, private reflection space designed for your mind.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Link href="/reflect" className="btn-primary">Start Reflecting</Link>
          <Link href="/progress" className="btn-secondary">View Progress</Link>

          <Link 
            href="/auth/login" 
            className="text-slate-500 text-sm hover:text-primary"
          >
            Log in
          </Link>

          <Link 
            href="/auth/signup" 
            className="text-slate-500 text-sm hover:text-primary"
          >
            Create an account
          </Link>
        </div>

      </main>
    </>
  );
}
