"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, MessageSquarePlus, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UGEM_CONTACTS } from "@/lib/prefs";

export default function SuggestionsPage() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const [kind, setKind] = useState<"site" | "college">("site");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");

  const whatsappLink = useMemo(() => {
    const to = UGEM_CONTACTS.whatsapp.replace(/\D/g, "");
    const kindText = isFr
      ? kind === "site"
        ? "Suggestion pour le site"
        : "Problème à la faculté"
      : kind === "site"
        ? "اقتراح للموقع"
        : "مشكلة في الكلية";

    const lines = [
      isFr ? "*Formulaire Suggestions*" : "*نموذج الاقتراحات*",
      `${isFr ? "Type" : "النوع"}: ${kindText}`,
      `${isFr ? "Titre" : "العنوان"}: ${title || "-"}`,
      `${isFr ? "Détails" : "التفاصيل"}: ${details || "-"}`,
      `${isFr ? "Nom" : "الاسم"}: ${name || "-"}`,
    ];

    return `https://wa.me/${to}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [details, isFr, kind, name, title]);

  const canSend = title.trim().length > 2 && details.trim().length > 10;

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section
          className="section-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="section-content">
            <span className="app-hero-icon app-hero-icon-gold">
              <MessageSquarePlus size={18} />
            </span>
            <h1 className="mt-3 text-2xl font-black md:text-3xl">
              {isFr ? "Suggestions & Problèmes" : "الاقتراحات والمشاكل"}
            </h1>
            <p className="ui-muted mt-3">
              {isFr
                ? "Cet espace est dédié à recevoir les suggestions des étudiants sur le site et les problèmes rencontrés à la faculté."
                : "هذا القسم مخصص لاستقبال اقتراحات الطلاب حول الموقع والمشاكل التي تواجههم في الكلية."}
            </p>

            <div className="mt-4 grid gap-2 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setKind("site")}
                className={`ui-action rounded-xl border px-3 py-2 text-sm font-black ${
                  kind === "site"
                    ? "border-sky-500 bg-sky-500 text-white dark:bg-sky-500/25 dark:text-sky-100"
                    : "border-slate-200 bg-white text-slate-800 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                }`}
              >
                {isFr ? "Suggestion pour le site" : "اقتراح للموقع"}
              </button>
              <button
                type="button"
                onClick={() => setKind("college")}
                className={`ui-action rounded-xl border px-3 py-2 text-sm font-black ${
                  kind === "college"
                    ? "border-rose-500 bg-rose-500 text-white dark:bg-rose-500/25 dark:text-rose-100"
                    : "border-slate-200 bg-white text-slate-800 hover:bg-rose-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                }`}
              >
                {isFr ? "Problème à la faculté" : "مشكلة في الكلية"}
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isFr ? "Titre de la suggestion/problème" : "عنوان الاقتراح/المشكلة"}
                className="ui-field rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                placeholder={isFr ? "Décrivez en détail..." : "اشرح التفاصيل بشكل واضح..."}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isFr ? "Nom (optionnel)" : "الاسم (اختياري)"}
                className="ui-field rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="mt-3 inline-flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>
                {isFr
                  ? "Assurez-vous que le titre et les détails sont clairs avant l'envoi."
                  : "تأكد من كتابة عنوان واضح وتفاصيل كافية قبل الإرسال."}
              </span>
            </div>

            <a
              href={canSend ? whatsappLink : "#"}
              onClick={(e) => {
                if (!canSend) e.preventDefault();
              }}
              target="_blank"
              rel="noreferrer"
              className={`ui-action mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black ${
                canSend
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "cursor-not-allowed bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              }`}
            >
              <Send size={14} />
              {isFr ? "Envoyer via WhatsApp de l'Union" : "إرسال عبر واتساب الاتحاد"}
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

