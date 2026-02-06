import type { CSSProperties } from "react";

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
    </section>
  );
}
