"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, X } from "lucide-react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

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
                className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-md"
                onClick={() => onOpenChange(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                onClick={() => onOpenChange(false)}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
              >
                <div
                  className="relative w-full max-w-[23rem] overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(145deg,#0b1020_0%,#312e81_38%,#2563eb_100%)] p-4 shadow-[0_28px_80px_rgba(15,23,42,0.42)] sm:max-w-[24.5rem] sm:p-5"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_24%)]" />
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-fuchsia-400/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 flex w-full items-start justify-end">
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm transition hover:bg-white/20 active:scale-[0.98] [touch-action:manipulation]"
                        aria-label="إغلاق البطاقة"
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenChange(false);
                        }}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 p-1.5 shadow-[0_20px_40px_rgba(15,23,42,0.35)] sm:h-32 sm:w-32">
                      <div className="h-full w-full overflow-hidden rounded-full border-4 border-white/40">
                        <img
                          src={profileImageSrc}
                          alt="أحمد عبدالله مادي"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <Dialog.Title className="text-[1.35rem] font-black tracking-tight text-white sm:text-[1.55rem]">
                      أحمد عبدالله مادي
                    </Dialog.Title>

                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
                      <Code2 size={13} />
                      مطوّر الموقع
                    </div>

                    <p className="mt-4 text-sm leading-7 text-white/90">
                      طُوِّر هذا الموقع لخدمة طلاب كلية الاقتصاد والتسيير وتيسير الوصول إلى الأرشيف الدراسي
                      والمحتوى الأكاديمي.
                    </p>

                    <div className="mt-4 w-full rounded-2xl border border-amber-200/90 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 px-4 py-3 text-sm font-black text-slate-900 shadow-[0_16px_34px_rgba(250,204,21,0.28)]">
                      نخدم الطلاب نخدم الوطن
                    </div>

                    <div className="mt-4 grid w-full gap-2.5">
                      <a
                        href="https://wa.me/22244881891"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_35px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400 active:scale-[0.98]"
                      >
                        <FaWhatsapp size={20} />
                        <span>تواصل عبر واتساب</span>
                      </a>

                      <a
                        href="https://www.facebook.com/abdayem.said"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-blue-200/20 bg-blue-500/20 px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_30px_rgba(15,23,42,0.2)] transition hover:bg-blue-500/30 active:scale-[0.98]"
                      >
                        <FaFacebook size={18} />
                        <span>حسابي على فيسبوك</span>
                      </a>
                    </div>

                    <div className="mt-5 w-full rounded-2xl border border-white/12 bg-white/10 px-4 py-3 text-sm font-bold leading-6 text-white/95 backdrop-blur-sm">
                      <p>نسعد بخدمتكم ونتمنى لكم التوفيق.</p>
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
