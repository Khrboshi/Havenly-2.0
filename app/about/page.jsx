export default function AboutPage() {
  return (
    <main className="p-6 pb-24 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Havenly</h1>

      <p className="text-slate-600 leading-relaxed mb-6">
        Havenly is a calm, private space created to help you slow down,
        understand your emotions, and build small habits that support everyday
        wellbeing. What you write stays yours — always.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Our Vision</h2>
      <p className="text-slate-600 leading-relaxed">
        A world where mental wellbeing is simple, stigma-free, and accessible,
        where anyone can check in with themselves as naturally as checking the
        weather.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Our Mission</h2>
      <p className="text-slate-600 leading-relaxed">
        To empower people with a quiet digital space for reflection, emotional
        clarity, and gentle self-improvement — without noise, pressure, or
        judgment.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Why Create an Account?</h2>
      <ul className="text-slate-600 leading-relaxed list-disc pl-6 space-y-2">
        <li>Sync your reflections securely across devices</li>
        <li>Track your mood and emotional patterns over time</li>
        <li>Unlock weekly AI-powered insights for clarity & direction</li>
        <li>Build meaningful micro-habits for mental resilience</li>
      </ul>

      <p className="mt-8 text-xs text-slate-500">
        Privacy is at the core of Havenly. Your reflections belong only to you —
        and will never be shared or analyzed beyond your personal insights.
      </p>
    </main>
  );
}
