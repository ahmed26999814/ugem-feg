"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BookMarked,
  CalendarRange,
  Check,
  FolderSearch2,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { cardIn, easeOutExpo, fadeUp, staggerContainer } from "@/components/motion/variants";

type Level = "L1" | "L2" | "L3";
type ArchiveItem = { code: string; title: string; url: string };

const DATA: Record<Level, ArchiveItem[]> = {
  L1: [
    { code: "FC", title: "Finance et Comptabilite", url: "https://drive.google.com/drive/folders/1dpR5EaXY7CIjRGltqEhFKRiBbFkUtVfS" },
    { code: "GRH", title: "Gestion des Ressources Humaines", url: "https://drive.google.com/drive/folders/1touioqtfB8eQSb_Lmq8dwG56af739zbg" },
    { code: "BA", title: "Banque & Assurance", url: "https://drive.google.com/drive/folders/1ktLMekBzGQgjEoCu9aboJJR83q9j4ucb" },
    { code: "EG", title: "Economie-Gestion", url: "https://drive.google.com/drive/folders/11Oo35o5Ge3MuLGKILJ0Ov8nOGDwkLywD" },
  ],
  L2: [
    { code: "FC", title: "Finance et Comptabilite", url: "https://drive.google.com/drive/folders/1JsR-C0OuzgJXyIYjRZLJmyFaASILKHuV" },
    { code: "GRH", title: "Gestion des Ressources Humaines", url: "https://drive.google.com/drive/folders/1yEtbk3DVewGujZPOOBWuYzj-hdJgYYfs" },
    { code: "BA", title: "Banque & Assurance", url: "https://drive.google.com/drive/folders/1eM-Lf1P3zE9XxNl9CbyObniwdWkpExbq" },
    { code: "EG", title: "Economie-Gestion", url: "https://drive.google.com/drive/folders/1spwttYTq-h_z2avGw5xodjvTl2P09eql" },
  ],
  L3: [
    { code: "FC", title: "Finance et Comptabilite", url: "https://drive.google.com/drive/folders/1hBdYtu9irmJ5JR5UvYn2FsJ3bt2HLc6t" },
    { code: "GRH", title: "Gestion des Ressources Humaines", url: "https://drive.google.com/drive/folders/1Lyd3bjzISH4qyEh2LWFfIpA1DWoKyOF8" },
    { code: "BA", title: "Banque & Assurance", url: "https://drive.google.com/drive/folders/1FcvEsreknuip8cR1juqnRMG-PjHVw_hK" },
    { code: "GAP", title: "Gestion Administrative Publique", url: "https://drive.google.com/drive/folders/1iPo_nrTuEe2bX0TCrYpfEbdPTtYTI8QE" },
    { code: "GPT", title: "Gestion de Projet Technique", url: "https://drive.google.com/drive/folders/1quRKB59kro1v22vNmZF-pP5_tcQ0XEoV" },
  ],
};

const LEVELS: Level[] = ["L1", "L2", "L3"];

const ITEM_ALIASES: Record<string, string[]> = {
  FC: ["finance", "comptabilite", "finance et comptabilite", "مالية", "محاسبة"],
  GRH: ["ressources humaines", "rh", "grh", "الموارد البشرية"],
  BA: ["banque", "assurance", "banque assurance", "بنك", "تأمين"],
  EG: ["economie", "gestion", "eco", "اقتصاد", "تسيير"],
  GAP: ["gestion administrative publique", "administrative publique", "الادارة العمومية"],
  GPT: ["gestion de projet technique", "projet technique", "ادارة المشاريع"],
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_&]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ArchivePage() {
  const reduceMotion = useReducedMotion();
  const [level, setLevel] = useState<Level | null>(null);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<ArchiveItem | null>(null);
  const [result, setResult] = useState<ArchiveItem | null>(null);
  const [opening, setOpening] = useState(false);
  const [levelPickerOpen, setLevelPickerOpen] = useState(false);

  const list = useMemo(() => (level ? DATA[level] : []), [level]);
  const filtered = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return list;
    return list.filter((item) => {
      const base = normalizeText(`${item.code} ${item.title}`);
      const aliases = (ITEM_ALIASES[item.code] ?? []).map(normalizeText).join(" ");
      return `${base} ${aliases}`.includes(q);
    });
  }, [list, query]);

  const canSearch = Boolean(level) && query.trim().length > 0;

  const handleSearch = () => {
    if (!canSearch) return;
    const exact = list.find(
      (item) =>
        item.code.toLowerCase() === query.trim().toLowerCase() ||
        item.title.toLowerCase() === query.trim().toLowerCase(),
    );
    const target = picked ?? exact ?? filtered[0] ?? null;
    setResult(target);
  };

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section className="section-card app-hero-archive" variants={fadeUp} initial="hidden" animate="show">
          <div className="section-content">
            <span className="app-hero-icon app-hero-icon-gold">
              <FolderSearch2 size={19} />
            </span>
            <h1 className="mt-3 text-2xl font-black">اختر سنتك الدراسية وتخصصك</h1>
            <p className="ui-muted mt-2">
              نظام وصول ذكي للارشيف الدراسي بخطوات بسيطة: السنة ثم التخصص ثم فتح الارشيف.
            </p>
            <p className="text-soft-bg mt-3 text-xs font-bold">
              نعمل بشكل مستمر على إضافة الأرشيف.
            </p>
          </div>
        </motion.section>

        <section className="section-card mt-3 app-phone-panel">
          <div className="section-content">
            <p className="mb-2 text-sm font-bold">1. اختر السنة الدراسية</p>
            <button
              onClick={() => setLevelPickerOpen(true)}
              className="ui-action inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-400/50"
            >
              <span className="inline-flex items-center gap-2">
                <CalendarRange size={15} />
                {level ? `السنة المختارة: ${level}` : "اختيار السنة الدراسية"}
              </span>
              <span className="text-xs text-slate-500">▼</span>
            </button>

            <p className="mb-2 mt-4 text-sm font-bold">2. التخصص</p>
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute right-3 top-3 text-slate-400" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPicked(null);
                }}
                disabled={!level}
                placeholder={level ? "ابحث عن التخصص (مثال: FC / GRH / BA)" : "اختر السنة اولا"}
                className="ui-field w-full border border-slate-200 bg-white py-2 pl-3 pr-10 text-sm outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
              />
            </div>

            <AnimatePresence>
              {level && query.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-2 grid gap-2 sm:grid-cols-2"
                >
                  {filtered.slice(0, 6).map((item) => (
                    <button
                      key={`${item.code}-${item.url}`}
                      onClick={() => {
                        setPicked(item);
                        setQuery(`${item.code} - ${item.title}`);
                      }}
                      className={`ui-action rounded-xl border px-3 py-2 text-right text-sm font-semibold transition ${
                        picked?.url === item.url
                          ? "border-emerald-500 bg-emerald-100 text-emerald-900 dark:border-emerald-400/50 dark:bg-emerald-500/20 dark:text-emerald-200"
                          : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/40"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <BookMarked size={14} className="text-emerald-700 dark:text-emerald-300" />
                        {item.code}
                      </span>
                      <span>-</span>
                      <span>{item.title}</span>
                    </button>
                  ))}
                  {filtered.length === 0 ? (
                    <p className="ui-muted col-span-full rounded-xl border border-dashed border-slate-300 px-3 py-2 text-sm dark:border-slate-700">
                      لا توجد نتيجة مطابقة لهذا البحث داخل {level}.
                    </p>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSearch}
              disabled={!canSearch}
              className="ui-action cta-shine mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-black text-white dark:from-emerald-500 dark:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Search size={15} />
              بحث
            </button>
          </div>
        </section>

        <Dialog.Root open={levelPickerOpen} onOpenChange={setLevelPickerOpen}>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1.5px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-x-3 top-1/2 z-50 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900 md:inset-x-auto md:right-1/2 md:w-[460px] md:translate-x-1/2"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: easeOutExpo }}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-base font-black">السنة الدراسية</Dialog.Title>
                  <Dialog.Close className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X size={16} />
                  </Dialog.Close>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 max-[420px]:grid-cols-1 sm:grid-cols-3">
                  {LEVELS.map((item) => (
                    <motion.button
                      key={item}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      onClick={() => {
                        setLevel(item);
                        setQuery("");
                        setPicked(null);
                        setResult(null);
                        setLevelPickerOpen(false);
                      }}
                      className={`ui-action rounded-xl border px-3 py-2 text-sm font-black ${
                        level === item
                          ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400/50 dark:bg-emerald-500/25 dark:text-emerald-100"
                          : "border-slate-200 bg-white text-slate-900 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/40"
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root open={Boolean(result)} onOpenChange={(open) => !open && setResult(null)}>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1.5px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900 md:inset-x-auto md:right-1/2 md:top-1/2 md:w-[430px] md:-translate-y-1/2 md:translate-x-1/2"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-black">نتيجة البحث</Dialog.Title>
                  <Dialog.Close className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X size={16} />
                  </Dialog.Close>
                </div>

                {result ? (
                  <motion.div
                    className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.p className="text-sm" variants={cardIn}>
                      السنة: <span className="font-black">{level}</span>
                    </motion.p>
                    <motion.p className="mt-1 text-sm" variants={cardIn}>
                      التخصص: <span className="font-black">{result.code} - {result.title}</span>
                    </motion.p>
                    <motion.button
                      variants={cardIn}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      onClick={() => {
                        setOpening(true);
                        window.open(result.url, "_blank", "noopener,noreferrer");
                        setTimeout(() => setOpening(false), 600);
                      }}
                      className="ui-action cta-shine mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-black text-white"
                    >
                      {opening ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                      فتح الارشيف
                    </motion.button>
                  </motion.div>
                ) : (
                  <p className="ui-muted mt-3 text-sm">لم نجد تخصصا مطابقا للبحث الحالي.</p>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
