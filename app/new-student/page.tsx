import Link from "next/link";
import { BookOpen, FileText, GraduationCap, MessagesSquare, School } from "lucide-react";

const steps = [
  {
    title: "ابدأ بفهم نظام الكلية",
    text: "تعرف على نظام LMD، المستويات، والتخصصات المتاحة داخل كلية الاقتصاد والتسيير.",
    href: "/feg",
    icon: School,
  },
  {
    title: "راجع الملفات والدروس",
    text: "استخدم الأرشيف للوصول إلى ملفات PDF والمحاضرات المتوفرة حسب المستوى والتخصص.",
    href: "/archive",
    icon: FileText,
  },
  {
    title: "تابع الإعلانات",
    text: "راقب صفحة الإعلانات لمعرفة المستجدات الرسمية والمواعيد المهمة.",
    href: "/annonces",
    icon: BookOpen,
  },
  {
    title: "انضم إلى مجموعتك",
    text: "افتح روابط المجموعات حتى تصلك أخبار دفعتك وتحديثات الدراسة بسرعة.",
    href: "/groupes",
    icon: MessagesSquare,
  },
];

export default function NewStudentPage() {
  return (
    <main className="page-shell">
      <section className="container grid gap-4">
        <div className="section-card">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow">
              <GraduationCap size={30} />
            </span>
            <div>
              <h1 className="text-2xl font-black md:text-4xl">دليل الطالب الجديد</h1>
              <p className="mt-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                مساحة مفتوحة لمساعدة الطلاب الجدد على الوصول السريع لأهم أقسام الموقع.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Link
                key={step.href}
                href={step.href}
                className="section-card group block transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:hover:border-emerald-500/50"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h2 className="text-lg font-black">{step.title}</h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{step.text}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
