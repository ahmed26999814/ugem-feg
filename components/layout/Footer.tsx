"use client";

import { motion } from "framer-motion";
import { MessageCircle, Facebook, Code2, Sparkles } from "lucide-react";
import { UGEM_CONTACTS } from "@/lib/prefs";

export default function Footer() {
  const unionWhatsapp = `https://wa.me/${UGEM_CONTACTS.whatsapp.replace(/\D/g, "")}`;

  return (
    <footer className="main-footer">
      <div className="container footer-inner">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1.5">
            <img
              src="/ugem-logo.jpg"
              alt="شعار الاتحاد"
              className="h-7 w-7 rounded-full border border-white/70 object-cover"
            />
            <span className="text-xs font-black text-yellow-200">نخدم الطلاب نخدم الوطن</span>
          </div>
          <p className="footer-copy">جميع الحقوق محفوظة © 2026</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
            الاتحاد العام للطلاب الموريتانيين - قسم كلية الاقتصاد والتسيير، إطار طلابي رسمي
            يخدم الطلبة ويدافع عن حقوقهم الأكاديمية والاجتماعية.
          </p>
          <motion.a
            className="footer-dev-btn"
            href="https://wa.me/22231682774"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Code2 size={16} />
            <span>تم التطوير بواسطة أحمد</span>
            <Sparkles size={15} />
          </motion.a>
        </motion.div>

        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <a href={unionWhatsapp} target="_blank" rel="noreferrer" className="footer-chip">
            <MessageCircle size={16} />
            <span>واتساب الاتحاد</span>
          </a>
          <a href={UGEM_CONTACTS.facebook} target="_blank" rel="noreferrer" className="footer-chip">
            <Facebook size={16} />
            <span>فيسبوك الاتحاد</span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
