"use client";

import { motion } from "framer-motion";
import { MessageCircle, UserCog, Users, Megaphone } from "lucide-react";
import { DEV_WHATSAPP, UGEM_CONTACTS } from "@/lib/prefs";

const contacts = [
  {
    label: "التواصل مع المطور",
    href: `https://wa.me/${DEV_WHATSAPP.replace(/\D/g, "")}`,
    icon: UserCog,
  },
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

          <div className="mt-4 grid gap-2 md:grid-cols-2">
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
        </section>
      </div>
    </footer>
  );
}
