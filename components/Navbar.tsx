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
  { href: "/ugem", ar: "عن الاتحاد", fr: "UGEM" },
  { href: "/feg", ar: "عن الكلية", fr: "FEG" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/80">
      <div className="container py-2 sm:py-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/70">
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <Link
              href="/"
              className="inline-flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-yellow-300/70 bg-gradient-to-l from-yellow-100 via-emerald-50 to-red-50 px-2 py-2 dark:border-yellow-500/40 dark:from-yellow-500/10 dark:via-emerald-500/10 dark:to-red-500/10 sm:px-3"
            >
              <img
                src="/ugem-logo.jpg"
                alt="UGEM"
                className="h-9 w-9 shrink-0 rounded-full border border-white object-cover shadow-sm sm:h-10 sm:w-10"
              />
              <span className="min-w-0 text-[11px] font-black leading-4 text-slate-900 dark:text-slate-100 sm:text-sm sm:leading-5">
                {lang === "fr" ? "UGEM - Faculté d'Économie et de Gestion" : "الاتحاد العام كلية الاقتصاد والتسيير"}
              </span>
            </Link>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button
                onClick={toggleLang}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-extrabold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 sm:px-3 sm:text-sm"
                aria-label="toggle language"
              >
                {lang === "ar" ? "FR" : "AR"}
              </button>

              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 sm:px-3"
                aria-label="toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>

          <nav className="scrollbar-hide flex gap-2 overflow-x-auto px-1 pb-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-xl px-3 py-2 text-sm font-extrabold transition-all",
                    active
                      ? "bg-yellow-500 text-slate-900 shadow"
                      : "bg-slate-50 text-slate-800 hover:-translate-y-0.5 hover:bg-yellow-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  )}
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
