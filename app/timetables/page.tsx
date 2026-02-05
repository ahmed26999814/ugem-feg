"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarRange, ExternalLink, FileClock, FolderOpenDot } from "lucide-react";
import {
  cardIn,
  easeOutExpo,
  fadeUp,
  slideHorizontal,
  staggerContainer,
} from "@/components/motion/variants";

type Level = "L1" | "L2" | "L3";
type Resource = "Cours" | "TD" | "Devoir" | "Examen";
type Semester = { id: string; links: Partial<Record<Resource, string>> };

const DATA: Record<Level, Semester[]> = {
  L1: [
    {
      id: "S1",
      links: {
        TD: "https://drive.google.com/drive/folders/16YDtgyoJWqmU1zot7HFLE0Vlxu50wXei",
        Cours: "https://drive.google.com/drive/folders/1DT6RVor_8oRuQK3J2C7B7Dayoy6xy-O3",
        Devoir: "https://drive.google.com/drive/folders/1fQCQ7hqklcuMu0CvgmZDKUmFqZ47sLkC",
        Examen: "https://drive.google.com/drive/folders/16YDtgyoJWqmU1zot7HFLE0Vlxu50wXei",
      },
    },
    {
      id: "S2",
      links: {
        TD: "https://drive.google.com/drive/folders/1K59Aml6NkaXKJYL6LwCBIgXUv8ub9034",
        Cours: "https://drive.google.com/drive/folders/1Xz6DmoLWwHotuNivAPod-tgZNVP6SZ4s",
        Devoir: "https://drive.google.com/drive/folders/1wQPyjo9G0ruG3zv9kZbqlvvW6E__vU6M",
        Examen: "https://drive.google.com/drive/folders/1wxHwYxcAzjsVve2lw-Q6rP48Re4hGdgK",
      },
    },
  ],
  L2: [
    {
      id: "S3",
      links: {
        TD: "https://drive.google.com/drive/folders/1TTL7PXcKieOMHJNVoo_WHfYbcnHRwXEK",
        Cours: "https://drive.google.com/drive/folders/1vPWiTMHNLtP448DUNKl8DQONy-jgFML6",
        Devoir: "https://drive.google.com/drive/folders/1DQEo4xAvUUHpT1IjFgo_WMOz4NITeISN",
        Examen: "https://drive.google.com/drive/folders/1CP1PWojcHYZud5P-FY45WL1zpbAEYjNv",
      },
    },
    {
      id: "S4",
      links: {
        TD: "https://drive.google.com/drive/folders/1ixAQtqMYCYixOGVJX2PNu3MsUFzkTVu7",
        Cours: "https://drive.google.com/drive/folders/1mzaC3AhUF3U2LkiF3tf8lUkOmMtD2fMh",
        Devoir: "https://drive.google.com/drive/folders/1HsSdCWreMEiAbSM9Sz2mBUyMEO5SWZs8",
        Examen: "https://drive.google.com/drive/folders/19knl8Es_eRiKahJu_NFghnbzwKE2W0mD",
      },
    },
  ],
  L3: [],
};

export default function TimetablesPage() {
  const reduceMotion = useReducedMotion();
  const [level, setLevel] = useState<Level | null>(null);
  const [semesterId, setSemesterId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const semesters = useMemo(() => (level ? DATA[level] : []), [level]);
  const semester = useMemo(() => semesters.find((item) => item.id === semesterId) ?? null, [semesters, semesterId]);
  const resources: Resource[] = ["Cours", "TD", "Devoir", "Examen"];
  const step = semester ? 3 : level ? 2 : 1;

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section className="section-card app-hero-timetables" variants={fadeUp} initial="hidden" animate="show">
          <div className="section-content">
            <span className="app-hero-icon app-hero-icon-gold">
              <CalendarRange size={18} />
            </span>
            <h1 className="mt-3 text-2xl font-black md:text-3xl">الجداول</h1>
            <p className="ui-muted mt-3">
              تدفق بسيط: السنة ثم السداسي ثم روابط الملفات.
            </p>
          </div>
        </motion.section>

        <section className="section-card mt-3">
          <div className="section-content mb-3 flex items-center gap-2">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="inline-flex items-center gap-2">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                    step >= idx
                      ? "bg-yellow-500 text-slate-900"
                      : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-200"
                  }`}
                >
                  {idx}
                </span>
                {idx < 3 ? <span className="h-[2px] w-6 bg-slate-300 dark:bg-slate-600" /> : null}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div key="step-1" custom={direction} variants={slideHorizontal} initial="enter" animate="center" exit="exit">
                <p className="mb-2 text-sm font-bold text-slate-900 dark:text-slate-100">الخطوة 1: اختيار السنة</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {(["L1", "L2", "L3"] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        if (level === item) {
                          setDirection(-1);
                          setLevel(null);
                          setSemesterId(null);
                          return;
                        }
                        setDirection(1);
                        setLevel(item);
                        setSemesterId(null);
                      }}
                      className="ui-action rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm font-black text-slate-900 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step-2" custom={direction} variants={slideHorizontal} initial="enter" animate="center" exit="exit">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">الخطوة 2: اختيار السداسي</p>
                  <button
                    onClick={() => {
                      setDirection(-1);
                      setLevel(null);
                      setSemesterId(null);
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-300"
                  >
                    رجوع
                  </button>
                </div>
                {semesters.length === 0 ? (
                  <p className="text-sm text-slate-600 dark:text-slate-300">لا توجد روابط مضافة لهذه السنة حاليا.</p>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {semesters.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (semesterId === item.id) {
                            setDirection(-1);
                            setSemesterId(null);
                            return;
                          }
                          setDirection(1);
                          setSemesterId(item.id);
                        }}
                        className="ui-action rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-sm font-black text-slate-900 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40"
                      >
                        {item.id}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && semester && (
              <motion.div key="step-3" custom={direction} variants={slideHorizontal} initial="enter" animate="center" exit="exit">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">الخطوة 3: الروابط</p>
                  <button
                    onClick={() => {
                      setDirection(-1);
                      setSemesterId(null);
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-300"
                  >
                    رجوع
                  </button>
                </div>
                <motion.div className="grid gap-2 sm:grid-cols-2" variants={staggerContainer} initial="hidden" animate="show">
                  {resources.map((resource) => {
                    const href = semester.links[resource];
                    if (!href) return null;
                    return (
                      <motion.a
                        key={resource}
                        variants={cardIn}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={reduceMotion ? undefined : { y: -2 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        className="ui-action inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-yellow-500/40"
                      >
                        <span className="inline-flex items-center gap-2">
                          {resource === "Examen" ? <FileClock size={15} /> : <FolderOpenDot size={15} />}
                          {resource}
                        </span>
                        <ExternalLink size={14} className="text-yellow-700 dark:text-yellow-300" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
