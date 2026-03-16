﻿﻿﻿﻿﻿"use client";

import { motion } from "framer-motion";
import { MessageCircle, Code2, Users, Megaphone, ArrowLeft } from "lucide-react";
import { DEV_WHATSAPP, UGEM_CONTACTS } from "@/lib/prefs";

const contacts = [
  {
    label: "حساب الاتحاد على واتساب",
    href: `https://wa.me/${UGEM_CONTACTS.whatsapp.replace(/\D/g, "")}`,
    icon: Users,
  },
  {
    label: "التواصل مع مسؤول الإعلام",
    href: `https://wa.me/${UGEM_CONTACTS.mediaPhone.replace(/\D/g, "")}`,
    icon: Megaphone,
  },
  {
    label: "التواصل مع رئيس الاتحاد",
    href: `https://wa.me/${UGEM_CONTACTS.presidentPhone.replace(/\D/g, "")}`,
    icon: MessageCircle,
  },
];

export default function ContactFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <section className="section-card dark:border-slate-800 dark:bg-slate-900/40">
          <h2 className="text-xl font-black dark:text-slate-100">تواصل معنا</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            يمكنك التواصل مع المطور أو مع الاتحاد مباشرة عبر واتساب.
          </p>

          <div className="mt-4 grid gap-2 md:grid-cols-3">
            {contacts.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-slate-800"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </motion.a>
              );
            })}
          </div>

          <motion.a
            href={`https://wa.me/${DEV_WHATSAPP.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-8 block w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#0b0f19] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.4)] dark:border-slate-800 dark:bg-slate-900/50"
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
          >
            {/* كرات مضيئة متحركة في الخلفية */}
            <div className="absolute -right-10 -top-20 h-64 w-64 animate-pulse rounded-full bg-indigo-600/20 blur-[80px]" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-20 -left-10 h-64 w-64 animate-pulse rounded-full bg-fuchsia-600/20 blur-[80px]" style={{ animationDuration: '5s' }} />

            <div className="relative z-10 flex flex-col items-center gap-6 p-6 text-center sm:flex-row sm:p-8 sm:text-start">
              {/* الأيقونة الدائرية الكبيرة */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 sm:h-24 sm:w-24">
                <Code2 size={40} className="max-sm:h-8 max-sm:w-8" />
              </div>
              
              {/* النصوص */}
              <div className="flex-1">
                <span className="mb-3 inline-block rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-bold tracking-wider text-fuchsia-400 shadow-sm">
                  نسخة المطورين ✨
                </span>
                <h3 className="mb-2 text-2xl font-black text-white sm:text-3xl">إعداد وتطوير المنصة</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
                  تمت البرمجة والتصميم بكل حب بواسطة <br className="sm:hidden" />
                  <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-lg font-black text-transparent">المصطفى & أحمد</span>
                </p>
              </div>

              {/* زر التواصل */}
              <div className="w-full shrink-0 sm:w-auto">
                <div className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 font-bold text-white backdrop-blur-md transition-all group-hover:bg-white/10 group-hover:text-fuchsia-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <MessageCircle size={22} />
                  <span>تواصل مع المطور</span>
                </div>
              </div>
            </div>
          </motion.a>
        </section>
      </div>
    </footer>
  );
}
