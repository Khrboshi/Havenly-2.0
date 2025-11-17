"use client";

import { useEffect, useState } from "react";

export default function AddToHomeScreen() {
  const [isIOS, setIsIOS] = useState(false);
  const [isChrome, setIsChrome] = useState(false);
  const [promptEvent, setPromptEvent] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    // Detect iOS Safari
    const iOS =
      /iphone|ipad|ipod/.test(userAgent) &&
      !window.navigator.standalone;

    setIsIOS(iOS);

    // Detect Chrome (Android)
    setIsChrome(window.matchMedia("(display-mode: browser)").matches);

    // Handle Android install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setPromptEvent(e);
      setShow(true);
    });
  }, []);

  const installPWA = async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    if (result.outcome === "accepted") setShow(false);
  };

  // Auto-show for iOS users
  useEffect(() => {
    if (isIOS) setShow(true);
  }, [isIOS]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-[90%] max-w-md bg-white shadow-md rounded-xl p-4 border border-gray-200 animate-fadeIn z-50">
      {/* ANDROID */}
      {promptEvent && (
        <>
          <p className="text-sm font-medium">
            Install Havenly for a faster experience.
          </p>

          <button
            onClick={installPWA}
            className="mt-3 w-full bg-black text-white py-2 rounded-lg"
          >
            Install App
          </button>
        </>
      )}

      {/* iOS SAFARI */}
      {isIOS && !promptEvent && (
        <div>
          <p className="text-sm font-medium">
            Add Havenly to your Home Screen:
          </p>
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
            <li>Tap the <strong>Share</strong> button</li>
            <li>Select <strong>“Add to Home Screen”</strong></li>
          </ul>
        </div>
      )}

      <button
        onClick={() => setShow(false)}
        className="mt-3 text-xs text-gray-500 w-full text-center"
      >
        Dismiss
      </button>
    </div>
  );
}
