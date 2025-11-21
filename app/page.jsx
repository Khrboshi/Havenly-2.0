import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col items-center">

      {/* HERO SECTION */}
      <section className="text-center py-24 px-6 fade-in w-full max-w-3xl">
        <h1 className="text-5xl font-semibold text-brand-dark leading-tight mb-6">
          Feel lighter.<br />
          Live calmer.<br />
          Grow emotionally—every day.
        </h1>

        <p className="text-gray-600 max-w-md mx-auto mb-10">
          Your personal wellbeing companion. Build clarity, reduce stress,
          and form gentle daily habits that support your mental and emotional health.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/signup" className="btn-primary">
            Start Free — Create Your Account
          </Link>
          <Link href="/auth/login" className="text-brand-dark underline text-sm">
            Log In
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full max-w-5xl px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 fade-in">

        <div className="h-card text-center p-6">
          <div className="text-5xl mb-4">🧠</div>
          <h3 className="text-xl font-semibold text-brand-dark mb-3">
            Reflect Daily
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Answer mindful prompts that help you pause, process your thoughts,
            and understand what you’re feeling.
          </p>
        </div>

        <div className="h-card text-center p-6">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-brand-dark mb-3">
            Track Your Mood
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Log your mood daily to build awareness of your emotional patterns
            and what influences them.
          </p>
        </div>

        <div className="h-card text-center p-6">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-brand-dark mb-3">
            Gain Insights
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Receive gentle, AI-powered reflections to support meaningful growth
            and emotional resilience.
          </p>
        </div>

      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full max-w-4xl px-6 py-12 fade-in">
        <h2 className="text-2xl font-bold text-brand-dark text-center mb-10">
          How Havenly Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="h-card p-6 text-center">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">1. Reflect</h3>
            <p className="text-sm text-gray-600">
              Start with a simple daily prompt crafted to help you reset and find clarity.
            </p>
          </div>

          <div className="h-card p-6 text-center">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">2. Log</h3>
            <p className="text-sm text-gray-600">
              Record your mood and thoughts to capture what shaped your day.
            </p>
          </div>

          <div className="h-card p-6 text-center">
            <h3 className="text-lg font-semibold text-brand-dark mb-2">3. Grow</h3>
            <p className="text-sm text-gray-600">
              Review your insights and trends to support long-term emotional wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="w-full max-w-3xl px-6 py-16 fade-in">
        <h2 className="text-2xl font-bold text-brand-dark text-center mb-10">
          What Others Say
        </h2>

        <div className="space-y-6">
          <div className="h-card p-6">
            <p className="text-gray-700 italic text-sm">
              “Using Havenly each morning helped me start my day calmer and more focused.”
            </p>
            <p className="text-gray-500 text-xs mt-2">— Maya, UX Designer</p>
          </div>

          <div className="h-card p-6">
            <p className="text-gray-700 italic text-sm">
              “It’s simple, grounding, and fits perfectly into my nightly routine.”
            </p>
            <p className="text-gray-500 text-xs mt-2">— Daniel, Student</p>
          </div>

          <div className="h-card p-6">
            <p className="text-gray-700 italic text-sm">
              “Havenly made me more aware of how I actually feel, not how I think I should feel.”
            </p>
            <p className="text-gray-500 text-xs mt-2">— Sara, Journalist</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full max-w-3xl text-center px-6 pb-20 fade-in">
        <div className="h-card p-10">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">
            Start Your Journey Today
          </h2>

          <p className="text-gray-600 mb-8">
            Build healthier emotional habits in just a few minutes each day.
          </p>

          <Link href="/auth/signup" className="btn-primary">
            Create a Free Account
          </Link>
        </div>
      </section>

    </main>
  );
}
