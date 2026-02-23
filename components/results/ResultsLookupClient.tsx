"use client";

import { FormEvent, startTransition, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ExternalLink,
  LoaderCircle,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import type { ExamLookupResponse, ExamModule, ExamSubject } from "@/lib/examResultsTypes";

type Props = {
  initialQuery?: string;
};

function isValidQuery(value: string) {
  return /^(?:[BE]\d{4,}|\d{4,})$/i.test(value.trim());
}

function decisionTone(decision?: string) {
  if (!decision) return "slate";
  const value = decision.toLowerCase();
  if (value.includes("non")) return "rose";
  if (value.includes("rattr")) return "amber";
  if (value.includes("valid")) return "emerald";
  return "slate";
}

function toneClasses(tone: string) {
  if (tone === "emerald") return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300";
  if (tone === "rose") return "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300";
  if (tone === "amber") return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300";
  return "border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-500/30 dark:bg-slate-500/10 dark:text-slate-300";
}

function SubjectRow({ subject }: { subject: ExamSubject }) {
  return (
    <div className="results-subject-row">
      <div className="results-subject-main">
        <div className="results-subject-code">{subject.code}</div>
        <div className="results-subject-title">{subject.title || "—"}</div>
      </div>

      <div className="results-subject-metrics">
        {subject.metrics.length ? (
          subject.metrics.map((metric, index) => (
            <span key={`${subject.code}-m-${index}`} className="results-metric-chip">
              <small>N{index + 1}</small>
              <strong>{metric}</strong>
            </span>
          ))
        ) : (
          <span className="results-muted-chip">No metrics</span>
        )}
      </div>

      <div className="results-subject-side">
        {subject.rank ? <span className="results-rank-badge">#{subject.rank}</span> : null}
        {subject.decision ? (
          <span className={`results-status-chip ${toneClasses(decisionTone(subject.decision))}`}>
            {subject.decision}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: ExamModule }) {
  return (
    <article className="results-module-card">
      <div className="results-module-head">
        <div>
          <p className="results-module-label">Unité / Module</p>
          <h3 className="results-module-code">{module.code}</h3>
        </div>
        <div className="results-module-meta">
          {typeof module.average === "number" ? (
            <span className="results-score-pill">
              <small>Moy.</small>
              <strong>{module.average}</strong>
            </span>
          ) : null}
          {module.decision ? (
            <span className={`results-status-chip ${toneClasses(decisionTone(module.decision))}`}>
              {module.decision}
            </span>
          ) : null}
        </div>
      </div>

      <div className="results-subject-list">
        {module.subjects.length ? (
          module.subjects.map((subject) => <SubjectRow key={`${module.code}-${subject.code}-${subject.rawLine}`} subject={subject} />)
        ) : (
          <div className="results-empty-line">No subject rows parsed for this module.</div>
        )}
      </div>
    </article>
  );
}

export default function ResultsLookupClient({ initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery.trim());
  const [data, setData] = useState<ExamLookupResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [didSearch, setDidSearch] = useState(Boolean(initialQuery.trim()));

  const normalizedSubmitted = submittedQuery.trim().toUpperCase();

  const hasDecisionMismatch = useMemo(() => {
    if (!data?.summary?.decision || !data?.summary?.headlineDecision) return false;
    return data.summary.decision !== data.summary.headlineDecision;
  }, [data]);

  async function runSearch(nextValue: string) {
    const value = nextValue.trim();
    if (!value) return;
    if (!isValidQuery(value)) {
      setDidSearch(true);
      setError("أدخل ID صحيحًا مثل E00624 أو رقم طالب مكوّن من أرقام.");
      setData(null);
      return;
    }

    setDidSearch(true);
    setSubmittedQuery(value);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/results-lookup?q=${encodeURIComponent(value)}`, { cache: "no-store" });
      const json = (await res.json()) as ExamLookupResponse;
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Lookup failed");
      }
      startTransition(() => setData(json));
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void runSearch(query);
  }

  useEffect(() => {
    if (!initialQuery.trim()) return;
    void runSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="results-shell">
      <div className="container">
        <section className="results-hero">
          <div className="results-hero-grid">
            <div>
              <p className="results-kicker">
                <Sparkles size={14} />
                نتائج الامتحانات داخل موقع UGEM-FEG
              </p>
              <h1 className="results-title">
                صفحة نتائج أكثر وضوحًا
                <span>مع جلب البيانات من الموقع الأصلي مباشرة</span>
              </h1>
              <p className="results-subtitle">
                أدخل `ID` مثل <code>E00624</code> أو رقم الطالب، وسنقوم بجلب النتيجة من <code>examen-feg.net</code> ثم عرضها بشكل
                منظم واحترافي.
              </p>
            </div>

            <div className="results-search-card">
              <form onSubmit={onSubmit} className="results-search-form">
                <label htmlFor="results-query" className="results-field-label">
                  البحث بالمعرّف أو رقم الطالب
                </label>
                <div className="results-input-wrap">
                  <Search size={18} />
                  <input
                    id="results-query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="E00624 أو 63476"
                    className="results-input"
                    dir="ltr"
                    autoComplete="off"
                  />
                </div>
                <div className="results-form-actions">
                  <button type="submit" className="results-submit-btn" disabled={loading || !isValidQuery(query)}>
                    {loading ? <LoaderCircle size={16} className="animate-spin" /> : <Search size={16} />}
                    <span>{loading ? "جاري البحث..." : "عرض النتيجة"}</span>
                  </button>
                  <a
                    href="https://examen-feg.net/"
                    target="_blank"
                    rel="noreferrer"
                    className="results-fallback-link"
                  >
                    <ExternalLink size={14} />
                    <span>الموقع الأصلي</span>
                  </a>
                </div>
                <p className="results-form-hint">
                  أمثلة صالحة: <code>E00624</code>، <code>B01234</code>، <code>63476</code>
                </p>
              </form>
            </div>
          </div>
        </section>

        {!didSearch ? (
          <section className="results-placeholder-panel">
            <UserRound size={22} />
            <div>
              <h2>ابدأ بالبحث</h2>
              <p>لن تظهر النتائج هنا حتى تقوم بإدخال رقم الطالب أو المعرّف ثم الضغط على "عرض النتيجة".</p>
            </div>
          </section>
        ) : null}

        {error ? (
          <section className="results-alert error">
            <AlertTriangle size={18} />
            <div>
              <h2>تعذر جلب النتيجة</h2>
              <p>{error}</p>
              <p className="results-alert-note">
                تأكد من تشغيل المشروع في بيئة تسمح بتشغيل Playwright/Edge لأن الجلب يتم من الموقع الأصلي تلقائيًا.
              </p>
            </div>
          </section>
        ) : null}

        {data && !error ? (
          <div className="results-content">
            <section className="results-summary-panel">
              <div className="results-summary-left">
                <div className="results-summary-title-wrap">
                  <h2 className="results-summary-title">
                    {data.summary?.name || "نتيجة الطالب"}
                  </h2>
                  <span className="results-query-badge">{normalizedSubmitted}</span>
                </div>
                <div className="results-summary-chips">
                  {data.summary?.id ? <span className="results-chip">ID: {data.summary.id}</span> : null}
                  {data.summary?.studentNumber ? <span className="results-chip">Numéro: {data.summary.studentNumber}</span> : null}
                  {typeof data.summary?.resultCount === "number" ? (
                    <span className="results-chip">{data.summary.resultCount} résultat(s)</span>
                  ) : null}
                  {data.summary?.headlineModule ? <span className="results-chip">Bloc: {data.summary.headlineModule}</span> : null}
                </div>
              </div>

              <div className="results-summary-stats">
                <div className="results-stat-card">
                  <span>Moyenne</span>
                  <strong>{typeof data.summary?.average === "number" ? data.summary.average.toFixed(2) : "—"}</strong>
                </div>
                <div className="results-stat-card">
                  <span>Décision</span>
                  <strong className={`results-decision-text tone-${decisionTone(data.summary?.decision)}`}>
                    {data.summary?.decision || "—"}
                  </strong>
                </div>
              </div>
            </section>

            {!data.found ? (
              <section className="results-alert">
                <AlertTriangle size={18} />
                <div>
                  <h2>لا توجد نتائج مطابقة</h2>
                  <p>لم يتم العثور على نتيجة لهذا الرقم في الموقع الأصلي.</p>
                </div>
              </section>
            ) : null}

            {hasDecisionMismatch ? (
              <section className="results-alert warn">
                <AlertTriangle size={18} />
                <div>
                  <h2>ملاحظة على البيانات</h2>
                  <p>
                    هناك اختلاف بين القرار المختصر في العنوان ({data.summary?.headlineDecision}) والقرار التفصيلي ({data.summary?.decision})
                    كما ورد من المصدر الأصلي.
                  </p>
                </div>
              </section>
            ) : null}

            {data.modules.length ? (
              <section className="results-modules-grid">
                {data.modules.map((module) => (
                  <ModuleCard key={`${module.code}-${module.rawLine}`} module={module} />
                ))}
              </section>
            ) : data.found ? (
              <section className="results-alert warn">
                <AlertTriangle size={18} />
                <div>
                  <h2>تم العثور على النتيجة</h2>
                  <p>لكن تعذّر تحويل البلوك الكامل إلى بطاقات وحدات/مواد. ستجد النص الخام في الأسفل.</p>
                </div>
              </section>
            ) : null}

            {(data.rawBlock || data.notes.length) ? (
              <section className="results-details-grid">
                {data.notes.length ? (
                  <article className="results-notes-card">
                    <h3>ملاحظات التحليل</h3>
                    <ul>
                      {data.notes.map((note, idx) => (
                        <li key={`${note}-${idx}`}>{note}</li>
                      ))}
                    </ul>
                  </article>
                ) : null}

                {data.rawBlock ? (
                  <article className="results-raw-card">
                    <h3>النص الخام من المصدر</h3>
                    <pre>{data.rawBlock}</pre>
                  </article>
                ) : null}
              </section>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
