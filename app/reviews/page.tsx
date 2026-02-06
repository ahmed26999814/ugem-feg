"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpenCheck, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Level = "L1" | "L2" | "L3";
type ReviewItem = { title: string; url: string };

const DATA: Record<Level, ReviewItem[]> = {
  L1: [
    { title: "Economie Gestion L1", url: "https://t.me/fegegl1" },
    { title: "BA L1", url: "https://t.me/+SPKzi3K9yjoyZmY8" },
    { title: "GRH L1", url: "https://t.me/ugemGRHL1" },
    { title: "FC L1", url: "https://t.me/+MCOboRlMZC8zNTg8" },
  ],
  L2: [
    { title: "Economie Gestion L2", url: "https://t.me/ugemEGL2" },
    { title: "BA L2", url: "https://t.me/ugemfedBAl2" },
    { title: "GRH L2", url: "https://t.me/ugemGRHL2" },
    { title: "FC L2", url: "https://t.me/ugemfcl2" },
  ],
  L3: [
    { title: "FC L3", url: "https://t.me/+wA5WWF_fBWBiZWQ8" },
    { title: "BA L3", url: "https://t.me/+wA5WWF_fBWBiZWQ8" },
    { title: "GRH L3", url: "https://t.me/+wA5WWF_fBWBiZWQ8" },
  ],
};

const LEVELS: Level[] = ["L1", "L2", "L3"];

export default function ReviewsPage() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const [level, setLevel] = useState<Level | null>(null);

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section
          className="section-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="section-content">
            <span className="app-hero-icon app-hero-icon-gold">
              <BookOpenCheck size={18} />
            </span>
            <h1 className="mt-3 text-2xl font-black md:text-3xl">
              {isFr ? "Revisions" : "المراجعات"}
            </h1>
            <p className="ui-muted mt-3">
              {isFr
                ? "Acces organise par niveau pour retrouver rapidement les revisions."
                : "وصول مرتب حسب السنوات حتى تصل للمراجعات بسرعة."}
            </p>
          </div>
        </motion.section>

        <section className="section-card mt-3 app-phone-panel">
          <div className="section-content">
            <p className="mb-2 text-sm font-bold">
              {isFr ? "1. Choisissez le niveau" : "1. اختر السنة الدراسية"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLevel(item)}
                  className={`ui-action rounded-xl border px-3 py-2 text-sm font-black ${
                    level === item
                      ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400/50 dark:bg-emerald-500/25 dark:text-emerald-100"
                      : "border-slate-200 bg-white text-slate-900 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/40"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="mb-2 mt-4 text-sm font-bold">
              {isFr ? "2. Choisissez la filiere" : "2. اختر التخصص"}
            </p>
            {level ? (
              <div className="grid gap-2 md:grid-cols-2">
                {DATA[level].map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ui-action inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Sparkles size={15} className="text-yellow-600 dark:text-yellow-300" />
                      {item.title}
                    </span>
                    <span className="text-xs font-black text-slate-500 dark:text-slate-300">
                      {isFr ? "Telegram" : "تيليجرام"}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="ui-muted rounded-xl border border-dashed border-slate-300 px-3 py-2 text-sm dark:border-slate-700">
                {isFr ? "Selectionnez un niveau pour afficher les liens." : "اختر السنة اولا لعرض الروابط."}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
