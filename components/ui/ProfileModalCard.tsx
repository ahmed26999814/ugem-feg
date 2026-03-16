"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type ProfileModalCardProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc?: string;
};

export default function ProfileModalCard({
  open,
  onOpenChange,
  imageSrc,
}: ProfileModalCardProps) {
  const profileImageSrc = imageSrc ?? "/ahmed.jfif";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => onOpenChange(false)}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
              >
                <div
                  className="relative max-h-[92vh] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-violet-700 via-indigo-700 to-sky-600 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.4)] sm:p-7"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_38%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.14),transparent_30%)]" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 flex w-full items-center justify-between gap-3">
                      <button
                        type="button"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-white/20 active:scale-[0.98] [touch-action:manipulation]"
                        aria-label="رجوع"
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenChange(false);
                        }}
                      >
                        <X size={18} />
                        <span>رجوع</span>
                      </button>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80">
                        <ArrowRight size={18} />
                      </span>
                    </div>

                    <div className="mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/40 bg-white/15 shadow-[0_18px_35px_rgba(15,23,42,0.35)]">
                      <img
                        src={profileImageSrc}
                        alt="أحمد عبدالله مادي"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <Dialog.Title className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      أحمد عبدالله مادي
                    </Dialog.Title>

                    <p className="mt-2 text-sm font-semibold text-sky-100 sm:text-base">
                      مطوّر الموقع
                    </p>

                    <p className="mt-5 text-sm leading-8 text-white/90 sm:text-[15px]">
                      تم تطوير هذا الموقع دعمًا للعمل الطلابي وخدمةً لطلاب كلية الاقتصاد والتسيير،
                      بهدف تسهيل الوصول إلى الأرشيف الدراسي والمحتوى الأكاديمي والمرجعات.
                    </p>

                    <div className="mt-5 w-full rounded-2xl border border-white/35 bg-white/85 px-4 py-3 text-sm font-black text-slate-800 shadow-[0_12px_30px_rgba(255,255,255,0.2)]">
                      نخدم الطلاب… نخدم الوطن
                    </div>

                    <a
                      href="https://wa.me/22244881891"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-5 py-4 text-base font-black text-white shadow-[0_18px_35px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400 active:scale-[0.98]"
                    >
                      <FaWhatsapp size={22} />
                      <span>تواصل عبر واتساب</span>
                    </a>

                    <div className="mt-6 space-y-1 text-sm font-bold leading-7 text-white/95">
                      <p>نسألكم الدعاء بالتوفيق</p>
                      <p>جزاكم الله خيرًا وبارك فيكم</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
