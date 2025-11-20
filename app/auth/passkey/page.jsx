"use client";

import { registerPasskey } from "@/lib/webauthn/client";

export default function PasskeySetupPage() {
  async function handleEnable() {
    try {
      await registerPasskey();
      alert("FaceID / TouchID enabled!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Passkey setup error:", err);
      alert("Failed to enable passkey.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center p-6 bg-white border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold mb-3">Enable FaceID / TouchID</h1>
        <p className="text-slate-600 text-sm mb-6">
          Log in faster and more securely using biometrics.
        </p>

        <button
          onClick={handleEnable}
          className="w-full py-3 bg-[#0D7A7E] text-white rounded-xl"
        >
          Enable biometric login
        </button>
      </div>
    </main>
  );
}
