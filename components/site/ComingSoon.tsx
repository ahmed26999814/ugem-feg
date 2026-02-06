import type { CSSProperties } from "react";
import { Facebook, MessageCircle } from "lucide-react";
import { UGEM_CONTACTS } from "@/lib/prefs";

const lineOneStyle = {
  "--type-steps": 34,
  "--type-width": "30ch",
  "--type-delay": "0.2s",
} as CSSProperties;

const lineTwoStyle = {
  "--type-steps": 28,
  "--type-width": "28ch",
  "--type-delay": "4.2s",
} as CSSProperties;

export default function ComingSoon() {
  const unionWhatsapp = `https://wa.me/${UGEM_CONTACTS.whatsapp.replace(/\D/g, "")}`;

  return (
    <section className="coming-soon" aria-live="polite">
      <div className="coming-soon-frame">
        <div className="coming-soon-logo-wrap">
          <img src="/ugem-logo.jpg" alt="شعار الاتحاد" className="coming-soon-logo" />
        </div>
        <div className="coming-soon-text">
          <p className="coming-soon-line line-primary" style={lineOneStyle}>
            سيتم إطلاق هذا الموقع قريبا ..
          </p>
          <p className="coming-soon-line line-hashtag" style={lineTwoStyle}>
            #نخدم_الطلاب_نخدم_الوطن ✌🏻💛
          </p>
        </div>
      </div>
      <div className="coming-soon-social">
        <a
          href={unionWhatsapp}
          className="coming-soon-social-link is-whatsapp"
          target="_blank"
          rel="noreferrer"
          aria-label="واتساب الاتحاد"
          title="واتساب الاتحاد"
        >
          <MessageCircle size={18} />
        </a>
        <a
          href={UGEM_CONTACTS.facebook}
          className="coming-soon-social-link is-facebook"
          target="_blank"
          rel="noreferrer"
          aria-label="فيسبوك الاتحاد"
          title="فيسبوك الاتحاد"
        >
          <Facebook size={18} />
        </a>
      </div>
    </section>
  );
}
