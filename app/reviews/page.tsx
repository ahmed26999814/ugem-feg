"use client";

import { motion } from "framer-motion";
import { MessageCircle, BookOpenCheck, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function ReviewsPage() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section
          className="section-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="section-content">
            <span className="app-hero-icon app-hero-icon-gold">
              <BookOpenCheck size={18} />
            </span>
            <h1 className="mt-3 text-2xl font-black md:text-3xl">
              {isFr ? "Revisions & Explications" : "المراجعات وشروحات التخصصات"}
            </h1>
            <p className="ui-muted mt-3">
              {isFr
                ? "Section dediee aux resumes, explications claires des modules et ressources utiles pour chaque niveau."
                : "قسم مخصص للملخصات، وشرح المواد بشكل واضح، ومصادر المراجعة المفيدة لكل مستوى."}
            </p>

            <div className="mt-4 grid gap-2 md:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="inline-flex items-center gap-2 text-base font-black">
                  <Sparkles size={15} className="text-yellow-600 dark:text-yellow-300" />
                  {isFr ? "Ce que vous trouverez" : "ماذا ستجد هنا"}
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                  {isFr
                    ? "Fiches de revision, plans de preparation aux examens et explications simplifiees selon chaque specialite."
                    : "ملخصات مركزة، وخطط للمراجعة قبل الامتحانات، وشروحات مبسطة حسب كل تخصص."}
                </p>
              </article>

              <article className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="inline-flex items-center gap-2 text-base font-black">
                  <MessageCircle size={15} className="text-sky-600 dark:text-sky-300" />
                  {isFr ? "Canal officiel" : "القناة الرسمية"}
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                  {isFr
                    ? "Les contenus sont publies sur le canal Telegram officiel de l'union."
                    : "يتم نشر المحتوى عبر قناة تيليجرام الرسمية الخاصة بالاتحاد."}
                </p>
              </article>
            </div>

            <a
              href="https://t.me/FEGugem"
              target="_blank"
              rel="noreferrer"
              className="ui-action mt-4 inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-black text-white hover:bg-sky-500"
            >
              {isFr ? "Acceder au canal Telegram" : "الدخول إلى قناة تيليجرام"}
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
