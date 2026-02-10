"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", ar: "الرئيسية", fr: "Accueil" },
  { href: "/annonces", ar: "الإعلانات", fr: "Annonces" },
  { href: "/archive", ar: "الأرشيف", fr: "Archives" },
  { href: "/reviews", ar: "المراجعات", fr: "Avis" },
  { href: "/specialites", ar: "التخصصات", fr: "Spécialités" },
  { href: "/groupes", ar: "المجموعات", fr: "Groupes" },
  { href: "/timetables", ar: "الجداول", fr: "Emplois" },
  { href: "/suggestions", ar: "الاقتراحات", fr: "Suggestions" },
  { href: "/ugem", ar: "عن الاتحاد", fr: "UGEM" },
  { href: "/feg", ar: "عن الكلية", fr: "FEG" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isComingSoon = pathname === "/coming-soon";
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [mounted, setMounted] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";
  const brandTitle =
    lang === "fr"
      ? "UGEM - Faculte d'Economie et de Gestion"
      : "الاتحاد العام - قسم كلية الاقتصاد والتسيير";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedTitle(brandTitle);
      setIsTyping(false);
      return;
    }

    setTypedTitle("");
    setIsTyping(true);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedTitle(brandTitle.slice(0, index));
      if (index >= brandTitle.length) {
        window.clearInterval(timer);
        setIsTyping(false);
      }
    }, 35);

    return () => window.clearInterval(timer);
  }, [brandTitle]);

  if (isComingSoon) return null;

  return (
    <header className="nav-shell">
      <div className="container nav-bar">
        <div className="nav-surface">
          <div className="nav-top">
            <Link href="/" className="nav-brand">
              <img
                src="/ugem-logo.jpg"
                alt="UGEM"
                className="nav-brand-logo"
              />
              <span
                className={cn(
                  "brand-motion brand-motion-nav nav-brand-title",
                  isTyping && "is-typing"
                )}
              >
                {typedTitle || "\u00A0"}
              </span>
            </Link>

            <div className="nav-actions">
              <button onClick={toggleLang} className="nav-btn" aria-label="toggle language">
                {lang === "ar" ? "FR" : "AR"}
              </button>

              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="nav-btn"
                aria-label="toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>

          <nav className="scrollbar-hide nav-tabs">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("nav-tab", active && "is-active")}
                >
                  {lang === "fr" ? item.fr : item.ar}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
