"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BellRing,
  BookOpenText,
  CircleHelp,
  FileCheck2,
  GraduationCap,
  Landmark,
  MapPinned,
  MessageCircleMore,
  NotebookTabs,
  Users,
} from "lucide-react";
import { cardIn, fadeUp, staggerContainer } from "@/components/motion/variants";
import { UGEM_CONTACTS } from "@/lib/prefs";

const quickStart = [
  {
    title: "ابدأ بالتسجيل والوثائق",
    text: "جهز أوراقك الأساسية وتابع ما تعلنه الإدارة والاتحاد أولًا بأول.",
    icon: FileCheck2,
  },
  {
    title: "افهم مستواك ومسارك",
    text: "اعرف الفرق بين L1 و L2 و L3 والتخصصات المتاحة داخل الكلية.",
    icon: GraduationCap,
  },
  {
    title: "تابع الجداول والإعلانات",
    text: "راجع الجدول باستمرار ولا تعتمد على معلومة قديمة أو منقولة فقط.",
    icon: BellRing,
  },
];

const firstWeek = [
  "احتفظ بصورة من وصل التسجيل وكل وثيقة مهمة على هاتفك.",
  "ادخل مجموعتك الدراسية وفعّل إشعارات الإعلانات الرسمية.",
  "تعرف على القاعات والمكاتب الأساسية من أول أسبوع.",
  "احفظ الروابط الأساسية: الأرشيف، الجداول، الإعلانات، المجموعات.",
];

const quickLinks = [
  {
    title: "الإعلانات",
    subtitle: "آخر الأخبار الرسمية والتنبيهات المهمة",
    href: "/annonces",
    icon: BellRing,
    iconClass: "",
  },
  {
    title: "الأرشيف الدراسي",
    subtitle: "ملفات ومحاضرات ومراجع PDF",
    href: "/archive",
    icon: BookOpenText,
    iconClass: "is-fc",
  },
  {
    title: "المجموعات",
    subtitle: "روابط تساعدك على الاندماج بسرعة",
    href: "/groupes",
    icon: Users,
    iconClass: "is-grh",
  },
  {
    title: "التخصصات",
    subtitle: "تعرف على المسارات المتاحة داخل الكلية",
    href: "/specialites",
    icon: Landmark,
    iconClass: "is-mix",
  },
  {
    title: "الجداول",
    subtitle: "متابعة المواقيت وتغييرات الحصص",
    href: "/timetables",
    icon: NotebookTabs,
    iconClass: "is-ba",
  },
  {
    title: "الاقتراحات",
    subtitle: "إذا احتجت مساعدة أو عندك ملاحظة",
    href: "/suggestions",
    icon: MessageCircleMore,
    iconClass: "is-other",
  },
];

const faq = [
  {
    q: "من أين أبدأ أولًا داخل الموقع؟",
    a: "ابدأ بالإعلانات، ثم الجداول، ثم الأرشيف والمجموعات حسب حاجتك اليومية.",
  },
  {
    q: "كيف أعرف تخصصي أو مساري الدراسي؟",
    a: "راجع صفحة التخصصات، ثم استفسر من زملائك أو ممثلي الاتحاد إذا بقي لديك لبس.",
  },
  {
    q: "إذا ضعت داخل الكلية ماذا أفعل؟",
    a: "تواصل مع زملائك في المجموعات أو مع الاتحاد، ولا تتردد في السؤال داخل الحرم.",
  },
  {
    q: "ما أهم شيء في أول أسبوع؟",
    a: "الالتزام بمتابعة الإعلانات الرسمية والجداول وعدم الاعتماد على الإشاعات.",
  },
];

export default function NewStudentPage() {
  const unionWhatsapp = `https://wa.me/${UGEM_CONTACTS.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section className="section-card app-hero-specialites" variants={fadeUp} initial="hidden" animate="show">
          <div className="section-content">
            <span className="app-hero-icon app-hero-icon-green">
              <GraduationCap size={19} />
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-chip text-xs font-black">طالب جديد</span>
              <span className="ui-kbd-chip">ابدأ من هنا</span>
            </div>
            <h1 className="mt-3">مرحبًا بك في كلية الاقتصاد والتسيير</h1>
            <p className="ui-muted mt-2 max-w-2xl">
              هذا القسم مخصص ليساعدك في أول أيامك داخل الكلية ويختصر عليك طريق الوصول إلى أهم
              الصفحات والمعلومات التي تحتاجها بسرعة.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/annonces" className="ui-action cta-shine rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white">
                ابدأ بالإعلانات
              </Link>
              <Link href="/groupes" className="ui-action rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                انضم إلى المجموعات
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section className="section-card mt-3" variants={fadeUp} initial="hidden" animate="show">
          <div className="section-content">
            <h2>خطة البداية السريعة</h2>
            <motion.div className="mt-4 app-card-grid" variants={staggerContainer} initial="hidden" animate="show">
              {quickStart.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} className="app-card" variants={cardIn}>
                    <div className="app-card-icon">
                      <Icon size={22} />
                    </div>
                    <div className="app-card-body">
                      <div className="app-card-title">{item.title}</div>
                      <div className="app-card-subtitle">{item.text}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.section className="section-card" variants={fadeUp} initial="hidden" animate="show">
            <div className="section-content">
              <h2>أهم ما تفعله في أسبوعك الأول</h2>
              <div className="mt-4 grid gap-3">
                {firstWeek.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/70"
                  >
                    <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
                      {index + 1}
                    </div>
                    <p className="m-0 text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="section-card app-groups-head" variants={fadeUp} initial="hidden" animate="show">
            <div className="section-content">
              <span className="app-hero-icon">
                <MapPinned size={18} />
              </span>
              <h2 className="mt-3">إذا احتجت مساعدة</h2>
              <p className="ui-muted mt-2">
                لا تنتظر حتى تتراكم عليك الأسئلة. يمكنك التواصل مباشرة مع الاتحاد أو متابعة
                الصفحات الأساسية من هنا.
              </p>
              <div className="mt-4 grid gap-2">
                <a
                  href={unionWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="ui-action rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-black text-white"
                >
                  تواصل عبر واتساب
                </a>
                <a
                  href={UGEM_CONTACTS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="ui-action rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  صفحة الاتحاد على فيسبوك
                </a>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.section className="section-card mt-3" variants={fadeUp} initial="hidden" animate="show">
          <div className="section-content">
            <h2>روابط مهمة لك داخل الموقع</h2>
            <motion.div className="mt-4 app-card-grid" variants={staggerContainer} initial="hidden" animate="show">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.href} variants={cardIn}>
                    <Link href={item.href} className="app-card">
                      <div className={`app-card-icon ${item.iconClass}`}>
                        <Icon size={22} />
                      </div>
                      <div className="app-card-body">
                        <div className="app-card-title">{item.title}</div>
                        <div className="app-card-subtitle">{item.subtitle}</div>
                      </div>
                      <span className="app-card-pill">افتح</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="section-card mt-3" variants={fadeUp} initial="hidden" animate="show">
          <div className="section-content">
            <div className="flex items-center gap-2">
              <span className="app-hero-icon app-hero-icon-gold">
                <CircleHelp size={18} />
              </span>
              <h2 className="m-0">أسئلة شائعة</h2>
            </div>
            <div className="mt-4 grid gap-3">
              {faq.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <h3 className="m-0 text-base font-black">{item.q}</h3>
                  <p className="mt-2 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
