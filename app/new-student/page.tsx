import Link from "next/link";
import {
  BellRing,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  HelpCircle,
  MessagesSquare,
  School,
} from "lucide-react";

const steps = [
  {
    title: "تعرف على الكلية",
    text: "ابدأ بفهم نظام LMD، المستويات، والتخصصات المتاحة داخل كلية الاقتصاد والتسيير.",
    href: "/feg",
    icon: School,
  },
  {
    title: "افتح الأرشيف",
    text: "راجع المحاضرات والملفات المتوفرة حسب المستوى والتخصص قبل بداية الدروس.",
    href: "/archive",
    icon: FileText,
  },
  {
    title: "تابع الإعلانات",
    text: "راقب المستجدات الرسمية والمواعيد المهمة حتى لا تفوتك أي معلومة.",
    href: "/annonces",
    icon: BellRing,
  },
  {
    title: "انضم إلى مجموعتك",
    text: "استخدم روابط المجموعات للوصول إلى أخبار دفعتك وتحديثات الدراسة بسرعة.",
    href: "/groupes",
    icon: MessagesSquare,
  },
];

const quickLinks = [
  { label: "التخصصات", href: "/specialites", icon: GraduationCap },
  { label: "جداول الدراسة", href: "/timetables", icon: CalendarDays },
  { label: "المراجعات", href: "/reviews", icon: BookOpen },
];

const faqs = [
  {
    question: "من أين أبدأ؟",
    answer: "ابدأ بصفحة الكلية ثم افتح الأرشيف وروابط المجموعات الخاصة بمستواك.",
  },
  {
    question: "أين أجد الملفات؟",
    answer: "قسم الأرشيف هو المكان المخصص للملفات والمحاضرات ومواد PDF.",
  },
  {
    question: "كيف أعرف الأخبار الجديدة؟",
    answer: "تابع صفحة الإعلانات باستمرار، فهي مخصصة للمستجدات المهمة.",
  },
];

export default function NewStudentPage() {
  return (
    <main className="page-shell new-student-page">
      <section className="container grid gap-4">
        <div className="section-card new-student-hero">
          <div className="section-content flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="app-hero-icon app-hero-icon-green">
                <GraduationCap size={26} />
              </span>
              <div>
                <h1 className="text-2xl font-black md:text-4xl">دليل الطالب الجديد</h1>
                <p className="mt-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  خطوات وروابط مختصرة لتبدأ داخل كلية الاقتصاد والتسيير بثقة.
                </p>
              </div>
            </div>
            <Link href="/archive" className="ui-action cta-shine rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-500">
              ابدأ من الأرشيف
            </Link>
          </div>
        </div>

        <div className="new-student-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Link key={step.href} href={step.href} className="new-student-step">
                <span className="new-student-step-number">{index + 1}</span>
                <span className="new-student-step-icon">
                  <Icon size={21} />
                </span>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.text}</small>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="section-card">
            <h2 className="inline-flex items-center gap-2 text-xl font-black">
              <HelpCircle size={19} className="text-emerald-700 dark:text-emerald-300" />
              أسئلة سريعة
            </h2>
            <div className="mt-3 grid gap-3">
              {faqs.map((item) => (
                <article key={item.question} className="new-student-faq">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-card">
            <h2 className="text-xl font-black">روابط تحتاجها كثيرًا</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="new-student-quick-link">
                    <Icon size={22} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
