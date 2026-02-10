"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";

type DeferredInstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallAppButton() {
  const pathname = usePathname();
  const isComingSoon = pathname === "/coming-soon";

  const [promptEvent, setPromptEvent] = useState<DeferredInstallPrompt | null>(null);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isComingSoon) return;

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const isSafari = /safari/.test(ua) && !/crios|fxios|edgios/.test(ua);

    if (isIOS && isSafari && !isStandalone) {
      setIosHint(true);
    }

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as DeferredInstallPrompt);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, [isComingSoon]);

  const canInstall = useMemo(() => Boolean(promptEvent) || iosHint, [promptEvent, iosHint]);
  if (isComingSoon || !canInstall) return null;

  const onInstall = async () => {
    if (promptEvent) {
      await promptEvent.prompt();
      await promptEvent.userChoice;
      setPromptEvent(null);
      return;
    }
    alert("على iPhone: افتح من Safari ثم مشاركة > Add to Home Screen");
  };

  return (
    <button
      type="button"
      onClick={onInstall}
      className="footer-chip footer-install-chip"
      aria-label="تثبيت التطبيق"
      title="تثبيت التطبيق"
    >
      <Download size={16} />
    </button>
  );
}
