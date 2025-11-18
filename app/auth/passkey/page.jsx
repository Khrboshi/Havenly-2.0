"use client";

import { registerPasskey } from "@/lib/webauthn";
import { toast } from "sonner";

export default function PasskeySetupPage() {
  async function enable() {
    try {
      await registerPasskey();
      toast.success("FaceID / TouchID enabled!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Enable FaceID / TouchID</h1>

      <p className="text-slate-600 mb-6">
        Securely log in using your device’s biometric authentication.
        This works on iPhone, Android, macOS, and Windows Hello.
      </p>

      <button
        onClick={enable}
        className="w-full py-3 bg-[#0D7A7E] text-white rounded-xl"
      >
        Enable FaceID / TouchID
      </button>
    </main>
  );
}
