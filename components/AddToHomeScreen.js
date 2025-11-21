"use client";

import { useState, useEffect } from "react";

export default function AddToHomeScreen() {
  const [isIos, setIsIos] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    const android = /android/.test(ua);

    const standalone =
      window.navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches;

    setIsIos(ios);

    if (ios && !standalone) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg shadow-lg max-w-xs">
      <p className="text-center text-sm font-medium">
        Install Havenly: Tap <span className="font-bold">Share</span> →{" "}
        <span className="font-bold">Add to Home Screen</span>
      </p>
    </div>
  );
}
