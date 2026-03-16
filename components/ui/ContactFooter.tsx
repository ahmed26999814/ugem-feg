﻿"use client";

import { motion } from "framer-motion";
import { MessageCircle, Code2, Users, Megaphone } from "lucide-react";
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
        <section className="section-card">
          <h2 className="text-xl font-black">تواصل معنا</h2>
          <p className="mt-2 text-sm text-slate-600">
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
                  className="contact-link"
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
            className="group relative mt-3 flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-lg transition-shadow hover:shadow-xl dark:from-slate-800 dark:to-slate-950"
          initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-indigo-300 backdrop-blur-sm transition-colors group-hover:bg-white/10 group-hover:text-indigo-200">
                <Code2 size={24} />
              </div>
              <div>
                <h3 className="font-black text-white">إعداد وتطوير الموقع</h3>
                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  برمجة وتصميم: <span className="font-bold text-indigo-300">المصطفى وأحمد</span>
                </p>
              </div>
            </div>
            <div className="relative z-10 hidden shrink-0 items-center justify-center rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-colors group-hover:bg-white/20 sm:flex">
              تواصل مع المطور
            </div>
          </motion.a>
        </section>
      </div>
    </footer>
  );
}
