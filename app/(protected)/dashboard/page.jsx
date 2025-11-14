export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <main className="p-6 pb-28">
      <h1 className="text-2xl font-semibold mb-4">Welcome back 👋</h1>

      <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl mb-6">
        <h2 className="text-lg font-medium mb-1">Daily Reflection</h2>
        <p className="text-slate-600 text-sm">
          Spend a moment checking in with yourself.
        </p>
      </div>

      <div className="grid gap-4">
        <a
          href="/reflect"
          className="w-full p-4 rounded-xl bg-white shadow border flex justify-between items-center"
        >
          <span className="font-medium">Start Reflection</span>
          <span className="text-primary">→</span>
        </a>

        <a
          href="/mood"
          className="w-full p-4 rounded-xl bg-white shadow border flex justify-between items-center"
        >
          <span className="font-medium">Track Mood</span>
          <span className="text-primary">→</span>
        </a>

        <a
          href="/insights"
          className="w-full p-4 rounded-xl bg-white shadow border flex justify-between items-center"
        >
          <span className="font-medium">View Insights</span>
          <span className="text-primary">→</span>
        </a>
      </div>
    </main>
  );
}
