"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Facebook, Laptop2, UserRound, Wrench, Phone, ArrowUpRight } from "lucide-react";
import { DEV_WHATSAPP, UGEM_CONTACTS } from "@/lib/prefs";
import InstallAppButton from "@/components/ui/InstallAppButton";
import VisitorCounter from "@/components/ui/VisitorCounter";

export default function Footer() {
  const [showDevLab, setShowDevLab] = useState(false);
  const unionWhatsapp = `https://wa.me/${UGEM_CONTACTS.whatsapp.replace(/\D/g, "")}`;
  const mediaPhone = `tel:${UGEM_CONTACTS.mediaPhone.replace(/\s+/g, "")}`;

  return (
    <footer className="main-footer">
      <div className="footer-aura footer-aura-one" />
      <div className="footer-aura footer-aura-two" />

      <div className="container footer-inner">
        <motion.div
          className="footer-brand-block"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="footer-brand-pill">
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
          <p className="footer-dedication">
            هذا الموقع إهداء من الخلية التقنية للاتحاد العام بكلية الإقتصاد و التسيير للرئيس السابق محمد المختار انجيه
            مواصلةً لنهجه وخدمةً للطلاب💛
          </p>
          <VisitorCounter />
        </motion.div>

        <motion.div
          className="footer-side"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className="footer-links">
            <a
              href={unionWhatsapp}
              target="_blank"
              rel="noreferrer"
              className="footer-chip footer-chip-wide"
              aria-label="واتساب الاتحاد"
              title="واتساب الاتحاد"
            >
              <MessageCircle size={17} />
              <span>واتساب</span>
            </a>
            <a
              href={UGEM_CONTACTS.facebook}
              target="_blank"
              rel="noreferrer"
              className="footer-chip footer-chip-wide"
              aria-label="فيسبوك الاتحاد"
              title="فيسبوك الاتحاد"
            >
              <Facebook size={17} />
              <span>فيسبوك</span>
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
          </div>

          <div className="footer-contact-grid">
            <a className="footer-contact-card" href={unionWhatsapp} target="_blank" rel="noreferrer">
              <span className="footer-contact-icon">
                <MessageCircle size={16} />
              </span>
              <span className="footer-contact-copy">
                <strong>تواصل مباشر</strong>
                <span>{UGEM_CONTACTS.whatsapp}</span>
              </span>
              <ArrowUpRight size={15} />
            </a>
            <a className="footer-contact-card" href={mediaPhone}>
              <span className="footer-contact-icon">
                <Phone size={16} />
              </span>
              <span className="footer-contact-copy">
                <strong>الهاتف الإعلامي</strong>
                <span>{UGEM_CONTACTS.mediaPhone}</span>
              </span>
            </a>
          </div>

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
