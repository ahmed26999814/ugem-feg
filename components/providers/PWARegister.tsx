"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let hasRefreshed = false;

    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((registration) => {
        registration.update().catch(() => {
          // Ignore update failures quietly.
        });

        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (hasRefreshed) return;
          hasRefreshed = true;
          window.location.reload();
        });
      })
      .catch(() => {
        // Keep silent in production if SW registration fails.
      });
  }, []);

  return null;
}
