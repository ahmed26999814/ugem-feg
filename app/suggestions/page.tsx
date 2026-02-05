"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, MessageSquarePlus, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UGEM_CONTACTS } from "@/lib/prefs";

type Kind = "site" | "college" | null;

type Step = 1 | 2 | 3;

export default function SuggestionsPage() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const [step, setStep] = useState<Step>(1);
  const [kind, setKind] = useState<Kind>(null);
  const [details, setDetails] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [name, setName] = useState("");

  const studentCodeValid =
    kind !== "college" || /^[EBeb][A-Za-z0-9-]{2,}$/.test(studentCode.trim());

  const canNextStep1 = kind !== null;
  const canNextStep2 = details.trim().length > 10 && studentCodeValid;
  const canSend = canNextStep1 && canNextStep2;

  const kindLabel = useMemo(() => {
    if (kind === "site") return isFr ? "Suggestion du site" : "اقتراح للموقع";
    if (kind === "college") return isFr ? "Probleme dans la faculte" : "مشكلة في الكلية";
    return isFr ? "Non choisi" : "غير محدد";
  }, [isFr, kind]);

  const whatsappLink = useMemo(() => {
    const to = UGEM_CONTACTS.whatsapp.replace(/\D/g, "");
    const lines = [
      isFr ? "*Formulaire Suggestions*" : "*نموذج الاقتراحات*",
      `${isFr ? "Type" : "النوع"}: ${kindLabel}`,
      `${isFr ? "Message" : "الرسالة"}: ${details || "-"}`,
      kind === "college"
        ? `${isFr ? "Code etudiant" : "رقم الطالب"}: ${studentCode || "-"}`
        : null,
      `${isFr ? "Nom" : "الاسم"}: ${name || "-"}`,
    ].filter(Boolean);

    return `https://wa.me/${to}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [details, isFr, kind, kindLabel, name, studentCode]);

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
              {isFr ? "Suggestions & Problemes" : "الاقتراحات والمشاكل"}
            </h1>
            <p className="ui-muted mt-3">
              {isFr
                ? "Espace dedie pour les suggestions du site et les problemes etudiants dans la faculte."
                : "مساحة مخصصة لاستقبال اقتراحات الطلاب حول الموقع ومشاكلهم في الكلية."}
            </p>

            {step === 1 && (
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setKind("site");
                    setStep(2);
                  }}
                  className={`suggestion-kind-btn ${kind === "site" ? "is-active is-site" : "is-site"}`}
                >
                  <span className="suggestion-kind-art" aria-hidden="true">
                    <svg className="suggestion-illustration is-site" viewBox="0 0 120 70" role="presentation">
                      <circle className="sugg-fill" cx="24" cy="18" r="9" />
                      <path className="sugg-fill" d="M14 30 C14 24, 34 24, 34 30 V50 C34 56, 14 56, 14 50 Z" />
                      <path className="sugg-line wave" d="M34 34 C46 30, 54 30, 64 34" />
                      <rect className="sugg-line" x="58" y="32" width="32" height="20" rx="4" />
                      <line className="sugg-line" x1="58" y1="46" x2="90" y2="46" />
                      <circle className="sugg-accent" cx="96" cy="18" r="7" />
                      <line className="sugg-accent-line" x1="96" y1="6" x2="96" y2="10" />
                      <line className="sugg-accent-line" x1="106" y1="12" x2="102" y2="14" />
                      <line className="sugg-accent-line" x1="86" y1="12" x2="90" y2="14" />
                    </svg>
                  </span>
                  <span className="suggestion-kind-text">
                    {isFr ? "Suggestion pour le site" : "اقتراح للموقع"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setKind("college");
                    setStep(2);
                  }}
                  className={`suggestion-kind-btn ${kind === "college" ? "is-active is-college" : "is-college"}`}
                >
                  <span className="suggestion-kind-art" aria-hidden="true">
                    <svg className="suggestion-illustration is-college" viewBox="0 0 120 70" role="presentation">
                      <circle className="sugg-fill sad" cx="28" cy="20" r="8" />
                      <path className="sugg-fill sad" d="M18 30 C18 24, 38 24, 38 30 V48 C38 54, 18 54, 18 48 Z" />
                      <path className="sugg-line sad" d="M24 22 Q28 19 32 22" />

                      <circle className="sugg-fill helper" cx="84" cy="18" r="8" />
                      <path className="sugg-fill helper" d="M74 28 C74 22, 96 22, 96 28 V50 C96 56, 74 56, 74 50 Z" />
                      <path className="sugg-line help" d="M74 36 C62 34, 54 34, 44 36" />
                      <path className="sugg-badge" d="M96 34 L102 36 L100 42 L96 44 L92 42 L90 36 Z" />
                      <path className="sugg-accent" d="M104 12 C104 8, 110 8, 110 12 C110 16, 104 18, 104 22 C104 18, 98 16, 98 12 C98 8, 104 8, 104 12 Z" />
                    </svg>
                  </span>
                  <span className="suggestion-kind-text">
                    {isFr ? "Probleme dans la faculte" : "لدي مشكلة في الكلية"}
                  </span>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-4 grid gap-2">
                {kind === "college" && (
                  <>
                    <input
                      value={studentCode}
                      onChange={(e) => setStudentCode(e.target.value.toUpperCase())}
                      placeholder={isFr ? "Code etudiant (commence par E ou B)" : "رقمك في الكلية (يبدأ بـ E أو B)"}
                      className="ui-field rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    {!studentCodeValid && studentCode.trim().length > 0 ? (
                      <p className="text-xs font-bold text-rose-600 dark:text-rose-300">
                        {isFr
                          ? "Le code doit commencer par E ou B."
                          : "رقم الطالب يجب أن يبدأ بحرف E أو B."}
                      </p>
                    ) : null}
                  </>
                )}

                <div className="float-field">
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={6}
                    placeholder=" "
                    className="float-input"
                  />
                  <label className="float-label">
                    {isFr ? "Decrivez votre message..." : "اكتب التفاصيل هنا"}
                  </label>
                </div>
                <div className="inline-flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <span>
                    {isFr
                      ? "Plus les details sont clairs, plus la reponse sera utile."
                      : "كلما كانت التفاصيل أوضح، كانت المعالجة أسرع وأدق."}
                  </span>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-4 grid gap-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
                  <p>
                    <span className="font-black">{isFr ? "Type" : "النوع"}:</span> {kindLabel}
                  </p>
                  <p className="mt-1">
                    <span className="font-black">{isFr ? "Message" : "الرسالة"}:</span> {details}
                  </p>
                  {kind === "college" ? (
                    <p className="mt-1">
                      <span className="font-black">{isFr ? "Code etudiant" : "رقم الطالب"}:</span> {studentCode}
                    </p>
                  ) : null}
                </div>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isFr ? "Nom (optionnel)" : "الاسم (اختياري)"}
                  className="ui-field rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev))}
                  className="ui-action rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  {isFr ? "Retour" : "رجوع"}
                </button>
              ) : null}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev))}
                  disabled={(step === 1 && !canNextStep1) || (step === 2 && !canNextStep2)}
                  className="ui-action rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isFr ? "Suivant" : "التالي"}
                </button>
              ) : (
                <a
                  href={canSend ? whatsappLink : "#"}
                  onClick={(e) => {
                    if (!canSend) e.preventDefault();
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className={`ui-action inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black ${
                    canSend
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "cursor-not-allowed bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                  }`}
                >
                  <Send size={14} />
                  {isFr ? "Envoyer via WhatsApp de l'union" : "إرسال عبر واتساب الاتحاد"}
                </a>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
