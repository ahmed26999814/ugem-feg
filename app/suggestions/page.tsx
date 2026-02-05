"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, MessageSquarePlus, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { UGEM_CONTACTS } from "@/lib/prefs";

type Kind = "site" | "college" | null;

export default function SuggestionsPage() {
  const { lang } = useLang();
  const isFr = lang === "fr";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [kind, setKind] = useState<Kind>(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [name, setName] = useState("");

  const studentCodeValid =
    kind !== "college" || /^[EBeb][A-Za-z0-9-]{2,}$/.test(studentCode.trim());

  const canNextStep1 = kind !== null;
  const canNextStep2 = title.trim().length > 2 && studentCodeValid;
  const canNextStep3 = details.trim().length > 10;
  const canSend = canNextStep1 && canNextStep2 && canNextStep3;

  const kindLabel = useMemo(() => {
    if (kind === "site") return isFr ? "Suggestion du site" : "اقتراح للموقع";
    if (kind === "college") return isFr ? "Probleme a la faculte" : "مشكلة في الكلية";
    return isFr ? "Non choisi" : "غير محدد";
  }, [isFr, kind]);

  const whatsappLink = useMemo(() => {
    const to = UGEM_CONTACTS.whatsapp.replace(/\D/g, "");
    const lines = [
      isFr ? "*Formulaire Suggestions*" : "*نموذج الاقتراحات*",
      `${isFr ? "Type" : "النوع"}: ${kindLabel}`,
      `${isFr ? "Titre" : "العنوان"}: ${title || "-"}`,
      `${isFr ? "Message" : "الرسالة"}: ${details || "-"}`,
      kind === "college"
        ? `${isFr ? "Code etudiant" : "رقم الطالب"}: ${studentCode || "-"}`
        : null,
      `${isFr ? "Nom" : "الاسم"}: ${name || "-"}`,
    ].filter(Boolean);

    return `https://wa.me/${to}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [details, isFr, kind, kindLabel, name, studentCode, title]);

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
                  onClick={() => setKind("site")}
                  className={`suggestion-kind-btn ${kind === "site" ? "is-active is-site" : "is-site"}`}
                >
                  <MessageSquarePlus size={16} />
                  <span>{isFr ? "Suggestion pour le site" : "اقتراح للموقع"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setKind("college")}
                  className={`suggestion-kind-btn ${kind === "college" ? "is-active is-college" : "is-college"}`}
                >
                  <AlertCircle size={16} />
                  <span>{isFr ? "Probleme dans la faculte" : "مشكلة في الكلية"}</span>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-4 grid gap-2">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={isFr ? "Titre" : "اكتب عنوانًا واضحًا"}
                  className="ui-field rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />

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
              </div>
            )}

            {step === 3 && (
              <div className="mt-4 grid gap-2">
                <div className="float-field">
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={6}
                    placeholder=" "
                    className="float-input"
                  />
                  <label className="float-label">
                    {isFr ? "Decrivez votre message..." : "وصف الاقتراح أو المشكلة"}
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

            {step === 4 && (
              <div className="mt-4 grid gap-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
                  <p>
                    <span className="font-black">{isFr ? "Type" : "النوع"}:</span> {kindLabel}
                  </p>
                  <p className="mt-1">
                    <span className="font-black">{isFr ? "Titre" : "العنوان"}:</span> {title}
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
                  onClick={() => setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev))}
                  className="ui-action rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  {isFr ? "Retour" : "رجوع"}
                </button>
              ) : null}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev))}
                  disabled={
                    (step === 1 && !canNextStep1) ||
                    (step === 2 && !canNextStep2) ||
                    (step === 3 && !canNextStep3)
                  }
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
