import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col items-center">

      {/* HERO SECTION */}
      <section className="text-center py-20 px-6 fade-in w-full max-w-3xl">
        <h1 className="text-4xl font-semibold text-brand-dark leading-tight mb-6">
          Feel lighter.<br />
          Live calmer.<br />
          Reflect daily.
        </h1>

        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Havenly helps you build emotional clarity and resilience through
          daily journaling and mindful check-ins.
        </p>

        <Link href="/auth/signup" className="btn-primary">
          Start Your Journey
        </Link>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full max-w-4xl px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6 fade-in">
        
        {/* Card 1 */}
        <div className="h-card text-center">
          <div className="text-4xl mb-3">🧠</div>
          <h3 className="text-lg font-semibold text-brand-dark mb-2">
            Reflect Daily
          </h3>
          <p className="text-sm text-gray-600">
            Answer guided prompts that help you process thoughts and gain clarity.
          </p>
        </div>

        {/* Card 2 */}
        <div className="h-card text-center">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-lg font-semibold text-brand-dark mb-2">
            Track Your Mood
          </h3>
          <p className="text-sm text-gray-600">
            Log your mood daily and build awareness of emotional patterns.
          </p>
        </div>

        {/* Card 3 */}
        <div className="h-card text-center">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="text-lg font-semibold text-brand-dark mb-2">
            Gain Insights
          </h3>
          <p className="text-sm text-gray-600">
            Receive AI-powered insights based on your reflections and trends.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full max-w-3xl text-center px-6 pb-24 fade-in">
        <div className="h-card p-8">
          <h2 className="text-2xl font-bold text-brand-dark">
            Start your journey today
          </h2>
          <p className="text-gray-600 mt-2 mb-6">
            Build healthier mental habits in just a few minutes each day.
          </p>

          <Link href="/auth/signup" className="btn-primary">
            Create an account
          </Link>
        </div>
      </section>

    </main>
  );
}
