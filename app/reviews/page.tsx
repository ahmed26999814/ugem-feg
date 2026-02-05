 "use client";

import { useLang } from "@/lib/i18n";

export default function ReviewsPage() {
  const { lang } = useLang();

  return (
    <div className="page-shell">
      <div className="container">
        <section className="section-card text-center">
          <h1 className="text-2xl font-black">{lang === "fr" ? "Bientôt" : "قريبًا"}</h1>
        </section>
      </div>
    </div>
  );
}
