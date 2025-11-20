export const metadata = {
  title: "About Havenly",
  description:
    "Learn about Havenly — a space designed to support daily reflection, emotional wellbeing, and mindful growth.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7FBFA] flex flex-col items-center px-6 pb-24">

      {/* HEADER */}
      <section className="w-full max-w-3xl text-center pt-20 pb-12">
        <h1 className="text-4xl font-extrabold text-[#0D7A7E]">About Havenly</h1>
        <p className="text-lg text-gray-600 mt-4">
          A calm and private space to understand your emotions, build mindful
          habits, and grow with intention.
        </p>
      </section>

      {/* OUR STORY */}
      <section className="w-full max-w-3xl bg-white border rounded-2xl p-8 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-[#0D7A7E] mb-3">Our Story</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Havenly was created with a simple mission: to help people slow down,
          reflect, and take care of their emotional wellbeing in an increasingly
          overwhelming world.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mt-4">
          We believe that reflection should feel natural, safe, and
          judgment-free. Whether you’re processing a tough moment or capturing a
          meaningful realization, Havenly provides a dedicated space for you to
          connect with your inner world.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-2">📖</div>
          <h3 className="text-lg font-semibold text-[#0D7A7E] mb-1">
            Thoughtful Reflections
          </h3>
          <p className="text-sm text-gray-600">
            Guided prompts help you explore your feelings and gain clarity in
            your personal journey.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-lg font-semibold text-[#0D7A7E] mb-1">
            Mood Tracking
          </h3>
          <p className="text-sm text-gray-600">
            Logging your mood daily helps you recognize emotional patterns and
            improve self-awareness.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-2">✨</div>
          <h3 className="text-lg font-semibold text-[#0D7A7E] mb-1">
            Personalized Insights
          </h3>
          <p className="text-sm text-gray-600">
            Receive AI-powered insights derived from your reflections, trends,
            and emotional experiences.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="text-lg font-semibold text-[#0D7A7E] mb-1">
            Private & Secure
          </h3>
          <p className="text-sm text-gray-600">
            Your reflections and emotions are personal — Havenly is built to
            protect that privacy at every step.
          </p>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="w-full max-w-3xl bg-white border rounded-2xl p-8 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-[#0D7A7E] mb-3">Our Values</h2>

        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold text-gray-700">Empathy</h4>
            <p className="text-sm text-gray-600">
              Every feature is designed to support your emotional wellbeing with
              kindness.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700">Privacy</h4>
            <p className="text-sm text-gray-600">
              Your inner thoughts belong only to you. Havenly prioritizes data
              protection and personal control.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-700">Growth</h4>
            <p className="text-sm text-gray-600">
              Small daily habits can create big changes. Havenly helps you move
              forward, one day at a time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-3xl text-center">
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0D7A7E]">
            Ready to start your journey?
          </h2>
          <p className="text-gray-600 mt-2 mb-6">
            Build a daily routine that supports your emotional wellbeing.
          </p>

          <a
            href="/auth/signup"
            className="px-8 py-3 rounded-xl bg-[#0D7A7E] text-white font-medium shadow-md hover:bg-[#0B666A] transition"
          >
            Join Havenly
          </a>
        </div>
      </section>

    </main>
  );
}
