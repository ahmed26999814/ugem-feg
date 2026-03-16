﻿﻿﻿"use client";

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
            className="group relative mt-6 block overflow-hidden rounded-[2rem] p-[2px] shadow-lg transition-shadow hover:shadow-2xl hover:shadow-indigo-500/20"
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* إطار مضيء متحرك */}
            <span 
              className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#6366f1_50%,#a855f7_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" 
              style={{ animationDuration: '4s' }} 
            />
            
            {/* المحتوى الداخلي للبطاقة */}
            <div className="relative flex h-full w-full flex-col justify-between gap-4 rounded-[calc(2rem-2px)] bg-slate-950 p-5 sm:flex-row sm:items-center sm:p-6">
              <div className="absolute inset-0 rounded-[calc(2rem-2px)] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex items-center gap-4 sm:gap-6">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm" />
                  <Code2 size={28} className="relative z-10 text-white" />
                </div>
                
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-black text-white sm:text-xl">
                    تطوير الموقع
                    <span className="inline-flex items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]">PRO</span>
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-400">
                    تم التصميم والبرمجة بواسطة <br className="sm:hidden" />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-base font-black text-transparent drop-shadow-sm">المصطفى & أحمد</span>
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 shrink-0">
                <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] sm:w-auto">
                  <span>تواصل معنا</span>
                  <ArrowLeft size={16} />
                </div>
              </div>
            </div>
          </motion.a>
        </section>
      </div>
    </footer>
  );
}
