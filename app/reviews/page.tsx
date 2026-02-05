"use client";

import { motion } from "framer-motion";
import { BookOpenCheck, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function ReviewsPage() {
  const { lang } = useLang();
  const isFr = lang === "fr";
  const reviewLinks = [
    {
      ar: "Economie Gestion L2",
      fr: "Economie Gestion L2",
      url: "https://t.me/+-jvODv5Ry4Y4NjFk",
    },
    {
      ar: "BA L2",
      fr: "BA L2",
      url: "https://t.me/+4cL2aX9KUuk5OGI0",
    },
    {
      ar: "GRH L2",
      fr: "GRH L2",
      url: "https://t.me/+hEwCz983LaszZDM8",
    },
    {
      ar: "FC L2",
      fr: "FC L2",
      url: "https://t.me/+NyRPP3om2Pc1NWE8",
    },
    {
      ar: "BA L1",
      fr: "BA L1",
      url: "https://t.me/+Q_d3bdj-g1AwY2Rk",
    },
    {
      ar: "GRH L1",
      fr: "GRH L1",
      url: "https://t.me/+SWVO4EruRS1mNzlk",
    },
    {
      ar: "FC L1",
      fr: "FC L1",
      url: "https://t.me/+bVPo2uhb641kOThk",
    },
    {
      ar: "Economie Gestion L1",
      fr: "Economie Gestion L1",
      url: "https://t.me/+0rEDprzjZkdjODA0",
    },
    {
      ar: "FC BA GRH L3",
      fr: "FC BA GRH L3",
      url: "https://t.me/+03kJd70YnvgyM2Zk",
    },
  ];

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
              {isFr ? "Revisions" : "المراجعات"}
            </h1>
            <p className="ui-muted mt-3">
              {isFr
                ? "Section dediee aux revues et ressources de revision pour chaque niveau."
                : "قسم مخصص للمراجعات ومصادر المراجعة المفيدة لكل مستوى."}
            </p>

            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {reviewLinks.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ui-action inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <span className="inline-flex items-center gap-2">
                    <Sparkles size={15} className="text-yellow-600 dark:text-yellow-300" />
                    {isFr ? item.fr : item.ar}
                  </span>
                  <span className="text-xs font-black text-slate-500 dark:text-slate-300">
                    {isFr ? "Telegram" : "تيليجرام"}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
