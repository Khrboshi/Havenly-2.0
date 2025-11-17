"use client";

import { useEffect, useState } from "react";

export default function AddToHomeScreen() {
  const [visible, setVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    const android = /android/.test(ua);

    const standalone =
      navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches;

    setIsIos(ios);
    setIsAndroid(android);
    setIsStandalone(standalone);

    const dismissed = localStorage.getItem("a2hs-dismissed");

    // Capture ANDROID install prompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault(); // Prevent default mini-infobar
      setDeferredPrompt(e);

      if (!dismissed && !standalone) {
        setTimeout(() => setVisible(true), 2200);
      }
    });

    // iOS custom popup (no native event)
    if (ios && !standalone && !dismissed) {
      setTimeout(() => setVisible(true), 2200);
    }
  }, []);

  const close = () => {
    localStorage.setItem("a2hs-dismissed", "true");
    setVisible(false);
  };

  const installAndroid = async () =>:
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("User accepted A2HS");
    } else {
      console.log("User dismissed A2HS");
    }

    setDeferredPrompt(null);
    close();
  };

  if (!visible) return null;

  return (
    <>
      {/* Background blur */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn" />

      {/* Popup card */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 animate-slideUp">
        <div className="bg-white shadow-2xl rounded-2xl p-5 border border-gray-200 relative">

          {/* Bounce icon */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-full p-3 animate-bounceSlow">
            {isIos ? (
              <span className="text-2xl">📤</span>
            ) : (
              <span className="text-2xl">⬇️</span>
            )}
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mt-4 text-center">
            Add Havenly to your Home Screen
          </h2>

          <p className="text-sm text-gray-600 mt-2 text-center leading-relaxed">
            Install the app for quicker access and a smoother experience.
          </p>

          {/* PLATFORM TEXT */}
          {isIos && (
            <p className="text-xs text-gray-600 mt-3 text-center">
              Tap <strong>Share → “Add to Home Screen”</strong>.
            </p>
          )}

          {/* ANDROID WITH NATIVE PROMPT AVAILABLE */}
          {isAndroid && deferredPrompt && (
            <button
              onClick={installAndroid}
              className="mt-5 w-full py-2 text-sm font-medium text-white bg-black rounded-xl hover:bg-gray-800 transition"
            >
              Install App
            </button>
          )}

          {/* ANDROID FALLBACK */}
          {isAndroid && !deferredPrompt && (
            <p className="text-xs text-gray-600 mt-3 text-center">
              Open your browser menu and tap <strong>“Install App”</strong>.
            </p>
          )}

          <button
            onClick={close}
            className="mt-4 w-full py-2 text-sm text-gray-600 border rounded-xl hover:bg-gray-50 transition"
          >
            Maybe later
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -6px);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.35s ease-out forwards;
        }

        .animate-bounceSlow {
          animation: bounceSlow 1.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
