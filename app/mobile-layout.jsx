"use client";

export default function MobileLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-slate-800 flex flex-col">
      <div className="flex-1 px-4 py-6">
        {children}
      </div>

      {/* Bottom Navigation */}
      <nav className="h-16 bg-white border-t flex justify-around items-center fixed bottom-0 left-0 right-0 shadow-lg">
        <a href="/dashboard" className="text-sm text-slate-600">Dashboard</a>
        <a href="/mood" className="text-sm text-slate-600">Mood</a>
        <a href="/journal" className="text-sm text-slate-600">Journal</a>
        <a href="/insights" className="text-sm text-slate-600">Insights</a>
        <a href="/profile" className="text-sm text-slate-600">Profile</a>
      </nav>
    </div>
  );
}
