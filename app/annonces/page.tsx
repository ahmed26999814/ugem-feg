"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, CalendarDays, Megaphone, RefreshCw, ShieldCheck, X } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  cardIn,
  easeOutExpo,
  fadeUp,
  staggerContainer,
} from "@/components/motion/variants";

type Row = Record<string, unknown>;
type Notice = {
  id: string;
  title: string;
  body: string;
  link?: string;
  source?: string;
  createdAt?: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ctqqttielcknjpzbynbk.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_a9vgnTKPnx9SK1u8wKHoTw_37glO0q3";

function toText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function normalizeRow(row: Row, index: number): Notice {
  return {
    id: toText(row.id, String(index)),
    title: toText(row.title) || toText(row.titre) || toText(row.name) || "إعلان",
    body: toText(row.body) || toText(row.content) || toText(row.description) || toText(row.text) || "",
    link: toText(row.link) || toText(row.url) || toText(row.href) || undefined,
    source: toText(row.source) || toText(row.author) || toText(row.publisher) || undefined,
    createdAt: toText(row.created_at) || toText(row.date) || toText(row.published_at) || undefined,
  };
}

function isImageUrl(url?: string) {
  if (!url) return false;
  if (url.startsWith("data:image/")) return true;
  return /\.(png|jpe?g|webp|gif|bmp|svg)(\?.*)?$/i.test(url);
}

export default function AnnoncesPage() {
  const reduceMotion = useReducedMotion();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Notice | null>(null);
  const [listRef] = useAutoAnimate();

  const load = async () => {
    try {
      const endpoint = `${SUPABASE_URL}/rest/v1/annonces?select=*&order=created_at.desc.nullslast`;
      const res = await fetch(endpoint, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        cache: "no-store",
      });
      if (!res.ok) {
        const text = await res.text();
        setError(`Supabase error ${res.status}: ${text}`);
        return;
      }
      const data = (await res.json()) as Row[];
      setNotices((Array.isArray(data) ? data : []).map(normalizeRow));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const headerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12 },
      show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    }),
    []
  );

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section className="section-card app-hero-annonces" variants={headerVariants} initial="hidden" animate="show">
          <div className="section-content">
            <span className="app-hero-icon app-hero-icon-red">
              <Megaphone size={18} />
            </span>
            <h1 className="mt-3 text-2xl font-black md:text-3xl">الإعلانات</h1>
            <p className="ui-muted mt-3">الإعلانات الرسمية مرتبة من الأحدث إلى الأقدم.</p>
            <button
              onClick={() => {
                setLoading(true);
                load();
              }}
              className="ui-action cta-shine mt-3 inline-flex items-center gap-2 bg-yellow-500 text-sm font-black text-slate-900"
            >
              <RefreshCw size={14} />
              تحديث
            </button>
          </div>
        </motion.section>

        {error && (
          <motion.section className="section-card mt-3 border-red-300/60 bg-red-50/80 dark:bg-red-500/10" variants={fadeUp} initial="hidden" animate="show">
            <div className="inline-flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle size={16} />
              <p className="text-sm font-bold">تعذّر تحميل الإعلانات.</p>
            </div>
            <p className="mt-2 text-xs text-red-700/80 dark:text-red-300/80">{error}</p>
          </motion.section>
        )}

        <motion.section
          ref={listRef}
          className="mt-3 grid gap-3 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {loading &&
            [1, 2, 3, 4].map((k) => (
              <motion.article key={k} className="section-card animate-pulse" variants={cardIn}>
                <div className="h-6 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mt-3 h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mt-2 h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
              </motion.article>
            ))}

          {!loading &&
            notices.map((item) => {
              const showImage = isImageUrl(item.link);
              return (
              <motion.article
                key={item.id}
                className="section-card animated-border-card cursor-pointer"
                variants={cardIn}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => setSelected(item)}
              >
                <div className="section-content">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-black">{item.title}</h2>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-300">
                      <ShieldCheck size={12} />
                      رسمي
                    </span>
                  </div>
                    {showImage ? (
                      <img
                        src={item.link}
                        alt={item.title}
                        className="mt-3 w-full rounded-xl border border-slate-200 object-contain shadow-sm dark:border-slate-700"
                        loading="lazy"
                      />
                    ) : null}
                  {item.body ? (
                    <p className="mt-2 line-clamp-3 text-sm">{item.body}</p>
                  ) : null}
                  {(item.source || item.createdAt) && (
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                      {item.source ? <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">المصدر: {item.source}</span> : null}
                      {item.createdAt ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">
                          <CalendarDays size={12} />
                          {item.createdAt}
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              </motion.article>
              );
            })}
        </motion.section>

        <Dialog.Root open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div className="fixed inset-0 z-40 bg-black/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-x-3 bottom-3 z-50 max-h-[82vh] overflow-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900 md:inset-x-auto md:right-1/2 md:top-1/2 md:w-[720px] md:-translate-y-1/2 md:translate-x-1/2"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-xl font-black">{selected?.title}</Dialog.Title>
                  <Dialog.Close className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X size={16} />
                  </Dialog.Close>
                </div>

                <motion.div
                  className="mt-3 space-y-3"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                >
                  {selected?.link && isImageUrl(selected.link) ? (
                    <motion.img
                      variants={cardIn}
                      src={selected.link}
                      alt={selected.title}
                      className="w-full rounded-2xl border border-slate-200 object-contain shadow-md dark:border-slate-700"
                    />
                  ) : null}

                  {selected?.body ? (
                    <motion.p variants={cardIn} className="text-sm leading-8">
                      {selected.body}
                    </motion.p>
                  ) : null}

                  {selected?.link && !isImageUrl(selected.link) ? (
                    <motion.a
                      variants={cardIn}
                      href={selected.link}
                      target="_blank"
                      rel="noreferrer"
                      className="ui-action cta-shine inline-flex bg-yellow-500 text-sm font-black text-slate-900"
                    >
                      فتح الرابط
                    </motion.a>
                  ) : null}
                  {selected?.link && isImageUrl(selected.link) ? (
                    <motion.a
                      variants={cardIn}
                      href={selected.link}
                      target="_blank"
                      rel="noreferrer"
                      className="ui-action cta-shine inline-flex bg-yellow-500 text-sm font-black text-slate-900"
                    >
                      فتح الصورة
                    </motion.a>
                  ) : null}
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
