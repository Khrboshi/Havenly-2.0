"use client";

import { registerPasskey } from "@/lib/webauthn/client";
import { toast } from "sonner";

export default function PasskeySetupPage() {
  async function handleEnable() {
    try {
      await registerPasskey();
      toast.success("FaceID / TouchID enabled for your account.");
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Passkey setup error:", err);
      toast.error(err?.message || "Unable to enable FaceID / TouchID.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center p-6 bg-white border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold mb-3">Enable FaceID / TouchID</h1>

        <p className="text-slate-600 text-sm mb-6">
          Securely log in using your device’s biometric authentication.
          This works on iPhone, Android, macOS, and Windows Hello (where supported).
        </p>

        <button
          onClick={handleEnable}
          className="w-full py-3 bg-[#0D7A7E] text-white font-medium rounded-xl"
        >
          Enable biometric login
        </button>

        <p className="mt-4 text-xs text-slate-500">
          You can always manage your login methods later from your profile.
        </p>
      </div>
    </main>
  );
}
