import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7FBFA] flex flex-col items-center">

      {/* HERO SECTION */}
      <section className="w-full max-w-3xl text-center px-6 pt-24 pb-16">
        <h1 className="text-4xl font-extrabold text-[#0D7A7E] leading-tight">
          Your Daily Space for Reflection, Clarity, and Emotional Wellbeing
        </h1>

        <p className="text-gray-600 text-lg mt-4">
          Havenly helps you understand your emotions, build mindful habits,
          and unlock personal insights — all in a calm, private space.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-xl bg-[#0D7A7E] text-white font-medium shadow-md hover:bg-[#0B666A] transition"
          >
            Get Started
          </Link>

          <Link
            href="/auth/login"
            className="px-8 py-3 rounded-xl border border-[#0D7A7E] text-[#0D7A7E] font-medium shadow-sm hover:bg-[#E6F4F3] transition"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full max-w-4xl px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Reflect Daily
          </h3>
          <p className="text-sm text-gray-600">
            Answer guided prompts that help you process thoughts and gain clarity.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Track Your Mood
          </h3>
          <p className="text-sm text-gray-600">
            Log your mood daily and build awareness of emotional patterns.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <div className="text-3xl mb-3">✨</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Gain Insights
          </h3>
          <p className="text-sm text-gray-600">
            Receive AI-powered insights based on your reflections and trends.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full max-w-3xl text-center px-6 pb-24">
        <div className="bg-white border rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#0D7A7E]">
            Start your journey today
          </h2>
          <p className="text-gray-600 mt-2 mb-6">
            Build healthier mental habits in just a few minutes each day.
          </p>

          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-xl bg-[#0D7A7E] text-white font-medium shadow-md hover:bg-[#0B666A] transition"
          >
            Create an account
          </Link>
        </div>
      </section>

    </main>
  );
}
