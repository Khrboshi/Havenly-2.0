export const metadata = {
  title: "About Havenly",
  description:
    "Learn more about Havenly’s purpose, mission, and approach to emotional wellbeing.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-bg px-6 py-16 fade-in">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-brand-dark mb-4">
          About Havenly
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          Havenly is a calm, private space designed to help you understand your
          emotions, build mindful habits, and grow with greater clarity each
          day.
        </p>

        {/* SECTION 1 — OUR STORY */}
        <section className="mb-12">
          <h2 className="section-title mb-3">Why Havenly Exists</h2>
          <p className="text-gray-600 leading-relaxed">
            In a fast-paced world, taking time to check in with yourself has
            become harder than ever. Havenly was created to make emotional
            reflection simple, accessible, and deeply personal — without noise,
            judgments, or pressure.
            <br />
            <br />
            Our goal is to provide you with a structured yet gentle way to pause,
            breathe, and reconnect with your inner clarity.
          </p>
        </section>

        {/* SECTION 2 — WHAT WE OFFER */}
        <section className="mb-12">
          <h2 className="section-title mb-3">What You’ll Find Here</h2>
          <div className="space-y-4">
            <div className="h-card">
              <h3 className="text-lg font-semibold text-brand-dark mb-1">
                Daily Reflection Prompts
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Thoughtfully crafted questions that help you process emotions,
                gain clarity, and build self-awareness.
              </p>
            </div>

            <div className="h-card">
              <h3 className="text-lg font-semibold text-brand-dark mb-1">
                Mood Tracking
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Log your mood with ease and observe meaningful patterns over
                time.
              </p>
            </div>

            <div className="h-card">
              <h3 className="text-lg font-semibold text-brand-dark mb-1">
                Personalized Insights
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive helpful, non-intrusive insights based on your emotional
                trends and reflection habits.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 — PHILOSOPHY */}
        <section className="mb-12">
          <h2 className="section-title mb-3">Our Philosophy</h2>
          <p className="text-gray-600 leading-relaxed">
            Your mind deserves the same care and attention as your body.
            Havenly’s design philosophy centers on:
          </p>

          <ul className="list-disc mt-3 ml-6 text-gray-600 leading-relaxed">
            <li>Minimalism that reduces overwhelm</li>
            <li>Privacy and security at every step</li>
            <li>Gentle guidance — never pressure or judgment</li>
            <li>Tools that grow with your emotional needs</li>
          </ul>
        </section>

        {/* SECTION 4 — CTA */}
        <section className="text-center mt-16">
          <h2 className="text-2xl font-bold text-brand-dark mb-3">
            Start Your Journey Today
          </h2>
          <p className="text-gray-600 mb-6">
            Just a few minutes each day can transform the way you feel and live.
          </p>

          <a href="/auth/signup" className="btn-primary">
            Create Your Account
          </a>
        </section>
      </div>
    </main>
  );
}
