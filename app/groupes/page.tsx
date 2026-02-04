"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Smartphone, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cardIn, fadeUp, springTransition, staggerContainer } from "@/components/motion/variants";

type Group = { title: string; href: string };

const GROUPS: Record<"L1" | "L2" | "L3", Group[]> = {
  L1: [
    { title: "ECO L1", href: "https://chat.whatsapp.com/IWHfepGy2h3D8oFcYikdRp?mode=gi_c" },
    { title: "FC L1", href: "https://chat.whatsapp.com/KRjjvuybeiq8WDpgCtMrXX?mode=gi_c" },
    { title: "GRH L1", href: "https://chat.whatsapp.com/IrxXqEAsa4O6FteckLts8R?mode=gi_c" },
    { title: "BA L1", href: "https://chat.whatsapp.com/BsZPE695grr7qXxcItJ0ro?mode=gi_c" },
  ],
  L2: [
    { title: "FC L2", href: "https://chat.whatsapp.com/Jj4oTPo9wvf4nktrx1cPWE?mode=gi_c" },
    { title: "GRH L2", href: "https://chat.whatsapp.com/EQCkppVKgF3K3Y3ZEfT5dx?mode=gi_c" },
    { title: "BA L2", href: "https://chat.whatsapp.com/JRr5QlOI0Xe2JXBQDgn9d1?mode=gi_c" },
  ],
  L3: [{ title: "مجموعة عامة L3", href: "https://chat.whatsapp.com/JhigkMEj99sFrManYzMuNY?mode=gi_c" }],
};

export default function GroupesPage() {
  const reduceMotion = useReducedMotion();
  const [openLevel, setOpenLevel] = useState<"L1" | "L2" | "L3" | null>(null);

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section className="section-card app-groups-head" variants={fadeUp} initial="hidden" animate="show">
          <div className="section-content text-center">
            <span className="app-hero-icon mx-auto">
              <FaWhatsapp size={18} />
            </span>
            <h1 className="mt-3 text-2xl font-black">مجموعات واتساب</h1>
            <p className="ui-muted mt-2">
              صفحة رسمية لمجموعات واتساب حسب السنة الدراسية. اختر المستوى ثم افتح المجموعة مباشرة.
            </p>
          </div>
        </motion.section>

        <motion.section className="mt-3 grid gap-3" variants={staggerContainer} initial="hidden" animate="show">
          {(Object.keys(GROUPS) as Array<keyof typeof GROUPS>).map((level, idx) => {
            const isOpen = openLevel === level;
            return (
              <motion.article
                key={level}
                className="section-card animated-border-card overflow-hidden app-phone-panel"
                variants={cardIn}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                transition={{ ...springTransition, delay: idx * 0.03 }}
              >
                <div className="pointer-events-none absolute -left-5 -top-7 opacity-[0.08] dark:opacity-[0.14]">
                  <Smartphone size={150} className="text-emerald-700 dark:text-emerald-300" />
                </div>
                <div className="section-content">
                  <button
                    onClick={() => setOpenLevel(isOpen ? null : level)}
                    className={`ui-action flex w-full items-center justify-between rounded-xl px-3 py-2 text-right ${
                      isOpen
                        ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200"
                        : "bg-slate-100/80 dark:bg-slate-800/70"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 text-lg font-black">
                      <Users size={18} className="text-emerald-700 dark:text-emerald-300" />
                      {level}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="mt-2 overflow-hidden"
                      >
                        <div className="grid gap-2">
                          {GROUPS[level].map((group) => (
                            <motion.a
                              key={group.title}
                              href={group.href}
                              target="_blank"
                              rel="noreferrer"
                              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                              className="ui-action inline-flex items-center justify-between rounded-xl border border-emerald-200 bg-gradient-to-l from-white to-emerald-50/70 px-3 py-2 text-sm font-semibold hover:border-emerald-400 hover:from-emerald-50 hover:to-emerald-100 dark:border-emerald-500/30 dark:from-slate-900 dark:to-emerald-500/10 dark:hover:border-emerald-400/50"
                            >
                              <span>{group.title}</span>
                              <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                                <FaWhatsapp size={15} />
                                واتساب
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </motion.section>
      </div>
    </div>
  );
}
