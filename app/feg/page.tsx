"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import {
  Building2,
  CalendarClock,
  ExternalLink,
  GraduationCap,
  Landmark,
  Languages,
  Microscope,
  School,
  Users,
} from "lucide-react";
import { cardIn, fadeUp, staggerContainer } from "@/components/motion/variants";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-800 dark:border-yellow-500/40 dark:bg-yellow-500/20 dark:text-yellow-300">
      {children}
    </span>
  );
}

export default function FegPage() {
  const [infraView, setInfraView] = useState<"infra" | "activities" | "students" | null>(null);
  const [infraDetail, setInfraDetail] = useState<"amphi" | "td" | "tp" | null>(null);

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section className="section-card" variants={fadeUp} initial="hidden" animate="show">
          <div className="flex flex-wrap items-center gap-3">
            <img
              src="/feg-logo.png"
              alt="FEG"
              className="h-16 w-16 rounded-full border border-white bg-white p-1 object-contain shadow"
            />
            <div>
              <h1 className="text-2xl font-black md:text-4xl">كلية الاقتصاد والتسيير (FEG)</h1>
              <p className="mt-1 text-sm font-bold text-yellow-700 dark:text-yellow-300">
                جامعة نواكشوط العصرية - Nouakchott - Mauritanie
              </p>
            </div>
          </div>
          <motion.div
            className="mt-3 h-[2px] origin-right rounded-full bg-gradient-to-l from-yellow-500 to-green-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45 }}
          />
        </motion.section>

        <Tabs.Root defaultValue="institution" dir="rtl" className="mt-3">
          <Tabs.List className="section-card scrollbar-hide flex max-w-full gap-2 overflow-x-auto p-2">
            <Tabs.Trigger
              value="institution"
              className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100"
            >
              الانتماء والنشأة
            </Tabs.Trigger>
            <Tabs.Trigger
              value="programs"
              className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100"
            >
              البرامج والتخصصات
            </Tabs.Trigger>
            <Tabs.Trigger
              value="infra"
              className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100"
            >
              البنية والأنشطة
            </Tabs.Trigger>
            <Tabs.Trigger
              value="admin"
              className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100"
            >
              الإدارة والمصادر
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="institution" className="mt-3 grid gap-3">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3">
            <motion.article className="section-card" variants={cardIn}>
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <Landmark size={18} className="text-yellow-700 dark:text-yellow-300" />
                الانتماء المؤسسي
              </h2>
              <p className="mt-2 text-sm">
                كلية الاقتصاد والتسيير هي إحدى كليات جامعة نواكشوط العصرية (Université de Nouakchott Al Aasriya)،
                وهي الجامعة العمومية الرئيسية في العاصمة نواكشوط، موريتانيا.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>تأسست الجامعة: 1981</Badge>
                <Badge>إعادة التنظيم: 2016</Badge>
              </div>
            </motion.article>

            <motion.article className="section-card" variants={cardIn}>
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <CalendarClock size={18} className="text-yellow-700 dark:text-yellow-300" />
                نشأة الكلية وتطورها
              </h2>
              <p className="mt-2 text-sm">
                خلال السنوات الأخيرة وخصوصًا في سنة 2025 تم فصل قسم الدراسات الاقتصادية عن الكلية السابقة، وإنشاء
                كلية الاقتصاد والتسيير ككلية مستقلة في إطار هيكلة الجامعة وتوضيح التخصصات وتحسين جودة التكوين الجامعي.
              </p>
            </motion.article>
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="programs" className="mt-3 grid gap-3">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3">
            <motion.article className="section-card" variants={cardIn}>
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <GraduationCap size={18} className="text-yellow-700 dark:text-yellow-300" />
                نظام الدراسة
              </h2>
              <p className="mt-2 text-sm">تعتمد الكلية نظام LMD: Licence - Master - Doctorat مع مستويات L1 وL2 وL3.</p>
            </motion.article>

            <motion.article className="section-card" variants={cardIn}>
              <h3 className="text-lg font-black">التخصصات المعتمدة</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <h4 className="font-black">L1</h4>
                  <p className="mt-1 text-sm">جذع مشترك (نظام LMD)</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <h4 className="font-black">L2</h4>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>- Économie - Gestion</li>
                    <li>- Finance et Comptabilité (FC)</li>
                    <li>- Gestion des Ressources Humaines (GRH)</li>
                    <li>- Banque et Assurance (BA)</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <h4 className="font-black">L3</h4>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>- Gestion Administrative Publique (GAP)</li>
                    <li>- Gestion de Projet Technique (GPT)</li>
                    <li>- Finance et Comptabilité (FC)</li>
                    <li>- Gestion des Ressources Humaines (GRH)</li>
                    <li>- Banque et Assurance (BA)</li>
                  </ul>
                </div>
              </div>
            </motion.article>

            <motion.article className="section-card" variants={cardIn}>
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <Languages size={18} className="text-yellow-700 dark:text-yellow-300" />
                لغة التدريس
              </h2>
              <p className="mt-2 text-sm">
                اللغة الأساسية للتدريس هي اللغة الفرنسية، وتستعمل العربية في بعض الجوانب الإدارية والتواصلية.
              </p>
            </motion.article>
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="infra" className="mt-3 grid gap-3">
            <motion.section className="section-card" variants={fadeUp} initial="hidden" animate="show">
              <div className="section-content">
                <h2 className="text-xl font-black">البنية والأنشطة</h2>
                <p className="ui-muted mt-2">اختر الفئة لعرض التفاصيل بشكل منظم:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setInfraView((prev) => (prev === "infra" ? null : "infra"))}
                    className={`ui-action border ${infraView === "infra" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    البنية التحتية
                  </button>
                  <button
                    onClick={() => setInfraView((prev) => (prev === "activities" ? null : "activities"))}
                    className={`ui-action border ${infraView === "activities" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    الأنشطة
                  </button>
                  <button
                    onClick={() => setInfraView((prev) => (prev === "students" ? null : "students"))}
                    className={`ui-action border ${infraView === "students" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    أوضاع الطلاب
                  </button>
                </div>
              </div>
            </motion.section>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3">
              {!infraView && (
                <motion.article className="section-card" variants={cardIn}>
                  <p className="ui-muted">اختر أحد الأزرار بالأعلى لعرض التفاصيل.</p>
                </motion.article>
              )}
              {infraView === "infra" && (
                <motion.article className="section-card" variants={cardIn}>
                  <h2 className="inline-flex items-center gap-2 text-xl font-black">
                    <Building2 size={18} className="text-yellow-700 dark:text-yellow-300" />
                    البنية التحتية والتجهيزات
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setInfraDetail((prev) => (prev === "amphi" ? null : "amphi"))}
                      className={`ui-action border ${infraDetail === "amphi" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                    >
                      المدرجات
                    </button>
                    <button
                      onClick={() => setInfraDetail((prev) => (prev === "td" ? null : "td"))}
                      className={`ui-action border ${infraDetail === "td" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                    >
                      قاعات TD
                    </button>
                    <button
                      onClick={() => setInfraDetail((prev) => (prev === "tp" ? null : "tp"))}
                      className={`ui-action border ${infraDetail === "tp" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                    >
                      قاعات TP
                    </button>
                  </div>

                  {infraDetail === "amphi" && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-300">المدرجات</p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>- G1</li>
                        <li>- G2</li>
                        <li>- G3</li>
                        <li>- G4</li>
                      </ul>
                    </div>
                  )}

                  {infraDetail === "td" && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-300">قاعات الأعمال التطبيقية TD</p>
                      <p className="mt-1 text-sm">حوالي 68 قاعة أعمال تطبيقية مخصّصة للدروس التطبيقية.</p>
                    </div>
                  )}

                  {infraDetail === "tp" && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-300">قاعات الأعمال التطبيقية TP</p>
                      <p className="mt-1 text-sm">3 قاعات TP مخصّصة للإعلاميات ومجهّزة بالحواسيب.</p>
                    </div>
                  )}
                </motion.article>
              )}

              {infraView === "activities" && (
                <motion.article className="section-card" variants={cardIn}>
                  <h2 className="inline-flex items-center gap-2 text-xl font-black">
                    <Microscope size={18} className="text-yellow-700 dark:text-yellow-300" />
                    الأنشطة والأحداث
                  </h2>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>- أيام دراسية</li>
                    <li>- ندوات علمية</li>
                    <li>- نقاشات علمية حول قضايا اقتصادية ومالية</li>
                    <li>- مثال: أيام دراسية حول أثر المالية الإسلامية في إصلاح قطاع التأمين</li>
                  </ul>
                </motion.article>
              )}

              {infraView === "students" && (
                <motion.article className="section-card" variants={cardIn}>
                  <h2 className="inline-flex items-center gap-2 text-xl font-black">
                    <Users size={18} className="text-yellow-700 dark:text-yellow-300" />
                    أوضاع الطلاب
                  </h2>
                  <p className="mt-2 text-sm">
                    شهدت الكلية في فترات سابقة إضرابات طلابية ومطالب أكاديمية وإدارية، ثم تم استئناف الدراسة بعد اتفاقات
                    بين الطاقم الإداري وممثلي الطلاب.
                  </p>
                </motion.article>
              )}
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="admin" className="mt-3 grid gap-3 md:grid-cols-2">
            <motion.article className="section-card" variants={cardIn} initial="hidden" animate="show">
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <School size={18} className="text-yellow-700 dark:text-yellow-300" />
                إدارة الكلية والتعاون
              </h2>
              <p className="mt-2 text-sm">عميد الكلية: الأستاذ محمد عبد الله عرفه.</p>
              <p className="mt-2 text-sm">
                توجد تعاونات أكاديمية مع مؤسسات خارجية، من بينها توقيع اتفاقيات مع معهد الدوحة للدراسات العليا.
              </p>
            </motion.article>

            <motion.article className="section-card" variants={cardIn} initial="hidden" animate="show">
              <h2 className="text-xl font-black">مصدر رسمي مرتبط بالكلية</h2>
              <a
                href="https://tinyurl.com/5fcndzzt"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-black text-slate-900 hover:bg-yellow-400"
              >
                موقع الكلية / نتائج الامتحانات والاختبارات
                <ExternalLink size={16} />
              </a>
            </motion.article>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
