"use client";

import { useLang } from "@/lib/i18n";

export default function ReviewsPage() {
  const { lang } = useLang();

  return (
    <div className="page-shell">
      <div className="container">
        <section className="section-card text-center">
          <h1 className="text-2xl font-black">{lang === "fr" ? "Bientot" : "قريبًا"}</h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            {lang === "fr"
              ? "Les revisions et explications des specialites seront publiees sur Telegram."
              : "المراجعات وشروحات التخصصات ستكون متاحة على تيليجرام."}
          </p>
          <a
            href="https://t.me/FEGugem"
            target="_blank"
            rel="noreferrer"
            className="ui-action mt-3 inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-black text-white hover:bg-sky-500"
          >
            t.me/FEGugem
          </a>
        </section>
      </div>
    </div>
  );
}
