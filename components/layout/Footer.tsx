"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Facebook, Laptop2, UserRound, Wrench } from "lucide-react";
import { DEV_WHATSAPP, UGEM_CONTACTS } from "@/lib/prefs";
import InstallAppButton from "@/components/ui/InstallAppButton";

export default function Footer() {
  const [showDevLab, setShowDevLab] = useState(false);
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

        </motion.div>

        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <a href={unionWhatsapp} target="_blank" rel="noreferrer" className="footer-chip" aria-label="واتساب الاتحاد" title="واتساب الاتحاد">
            <MessageCircle size={17} />
          </a>
          <a href={UGEM_CONTACTS.facebook} target="_blank" rel="noreferrer" className="footer-chip" aria-label="فيسبوك الاتحاد" title="فيسبوك الاتحاد">
            <Facebook size={17} />
          </a>
          <InstallAppButton />
          <motion.button
            type="button"
            className="footer-dev-btn"
            onClick={() => setShowDevLab((prev) => !prev)}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="إعداد وتطوير"
            title="إعداد وتطوير"
          >
            <span className="footer-dev-icon" aria-hidden="true">
              <Laptop2 size={14} />
            </span>
            <span className="footer-dev-text">
              <strong>إعداد وتطوير</strong>
            </span>
          </motion.button>

          <AnimatePresence initial={false}>
            {showDevLab ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.28 }}
                className="footer-dev-lab"
              >
                <div className="footer-dev-lab-scene" aria-hidden="true">
                  <motion.span
                    className="footer-dev-lab-person"
                    animate={{ y: [0, -1.5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <UserRound size={13} />
                  </motion.span>
                  <span className="footer-dev-lab-laptop">
                    <Laptop2 size={16} />
                    <motion.i
                      className="footer-dev-lab-typing"
                      animate={{ opacity: [0.3, 1, 0.3], x: [0, 2, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  </span>
                  <span className="footer-dev-lab-tools">
                    <Wrench size={12} />
                  </span>
                </div>

                <p className="footer-dev-lab-copy">إعداد وتطوير المصطفى وأحمد</p>
                <a
                  className="footer-dev-lab-link"
                  href={`https://wa.me/${DEV_WHATSAPP.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  واتساب المطور
                </a>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </footer>
  );
}
