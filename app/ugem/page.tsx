"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import {
  BadgeCheck,
  Facebook,
  Megaphone,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { cardIn, fadeUp, staggerContainer } from "@/components/motion/variants";

const missionItems = [
  "الدفاع عن الحقوق الأكاديمية والاجتماعية للطلاب",
  "نقل مطالب وانشغالات الطلاب إلى إدارة الكلية",
  "توضيح القرارات الإدارية والبلاغات الرسمية",
  "مرافقة الطلاب في القضايا الأكاديمية (التسجيل، الامتحانات، التوجيه)",
  "تأطير وتوجيه الطلاب الجدد (خصوصًا طلبة السنة الأولى L1)",
  "المساهمة في تحسين ظروف الدراسة والخدمات الجامعية",
  "محاربة الإشاعات ونشر المعلومة الصحيحة",
  "تعزيز روح التضامن والعمل الطلابي",
];

const leadership = [
  "محمد المختار انجيه — رئيس القسم",
  "إبراهيم عبدولا با — النائب الأول",
  "محمد عبدالله لحبوس — النائب الثاني",
];

const office = [
  "المصطفى عبدالله مادي — مسؤول الإعلام",
  "منى محمد يسلم — مسؤولة الانتساب والتعبئة والتحسيس",
  "فاطمة ديا — مسؤولة الانتساب",
  "محمد شغف يايينه (العويض) — مسؤول الثقافة والرياضة",
  "بنيته عبد الدايم — مسؤولة النساء",
  "زينة إبراهيم لي — مسؤولة العلاقات الخارجية",
  "أحمد لحبيب — مسؤول الشؤون الطلابية",
  "محمد عالي سيدي أحمد — مسؤول الطلبة الأجانب",
  "أحمد يابه سالم — مسؤول التنظيم",
  "أسماء محمد — مسؤولة المالية",
];

const deputies = [
  "ماكه المختار التلميدي — نائب مسؤول الإعلام",
  "امغيلي القطب — نائب مسؤول الانتساب",
  "محمد لمين سيدي الهادي — نائب مسؤول التنظيم",
  "السالكة فال اجوالي — نائب مسؤول التعبئة والتحسيس",
  "فاطمة الثابت (فاه) — نائب مسؤولة النساء",
  "الناه الداه اسويدي — نائب مسؤولة العلاقات الخارجية",
  "أحمد سالك بناهي — نائب مسؤول الشؤون الطلابية",
  "زيدان مولود — نائب مسؤول الثقافة والرياضة",
  "حفصة أنساني ديوب — نائب مسؤولة المالية",
];

type TeamView = "leaders" | "officials" | "deputies";
type TeamMember = { role: string; name: string };

function toMember(item: string, fallbackRole: string): TeamMember {
  const parts = item.split("—").map((p) => p.trim());
  return { name: parts[0] ?? item, role: parts[1] ?? fallbackRole };
}

export default function UgemPage() {
  const [teamView, setTeamView] = useState<TeamView | null>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const teamMembersMap = useMemo<Record<TeamView, TeamMember[]>>(
    () => ({
      leaders: leadership.map((i) => toMember(i, "القيادة")),
      officials: office.map((i) => toMember(i, "مسؤول")),
      deputies: deputies.map((i) => toMember(i, "نائب")),
    }),
    []
  );

  const teamTitleMap: Record<TeamView, string> = {
    leaders: "القيادة",
    officials: "المسؤولون",
    deputies: "النواب",
  };

  const activeMembers = teamView ? teamMembersMap[teamView] : [];
  const activeMember = selectedMember === null ? null : activeMembers[selectedMember] ?? null;

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section className="section-card" variants={fadeUp} initial="hidden" animate="show">
          <div className="flex flex-wrap items-center gap-3">
            <img src="/ugem-logo.jpg" alt="UGEM" className="h-16 w-16 rounded-full border border-white object-cover shadow" />
            <div>
              <h1 className="text-2xl font-black md:text-4xl">الاتحاد العام للطلاب الموريتانيين</h1>
              <p className="mt-1 text-sm font-bold text-yellow-700 dark:text-yellow-300">
                كلية الاقتصاد والتسيير – جامعة نواكشوط العصرية | UGEM – FEG
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

        <Tabs.Root defaultValue="about" dir="rtl" className="mt-3">
          <Tabs.List className="section-card scrollbar-hide flex max-w-full gap-2 overflow-x-auto p-2">
            <Tabs.Trigger value="about" className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100">
              الجهة والنبذة
            </Tabs.Trigger>
            <Tabs.Trigger value="mission" className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100">
              الرسالة والمهام
            </Tabs.Trigger>
            <Tabs.Trigger value="team" className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100">
              المكتب
            </Tabs.Trigger>
            <Tabs.Trigger value="contact" className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100">
              التواصل
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="about" className="mt-3 grid gap-3">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3">
              <motion.article className="section-card" variants={cardIn}>
                <h2 className="inline-flex items-center gap-2 text-xl font-black">
                  <BadgeCheck size={18} className="text-yellow-700 dark:text-yellow-300" />
                  الجهة
                </h2>
                <p className="mt-2 text-sm">
                  قسم تابع لـ الاتحاد العام للطلاب الموريتانيين (UGEM)، وهو نقابة طلابية وطنية مرخّصة، تُعد الإطار
                  الشرعي الممثل لطلاب التعليم العالي في موريتانيا.
                </p>
              </motion.article>

              <motion.article className="section-card" variants={cardIn}>
                <h2 className="inline-flex items-center gap-2 text-xl font-black">
                  <Users2 size={18} className="text-yellow-700 dark:text-yellow-300" />
                  نبذة عن الاتحاد
                </h2>
                <p className="mt-2 text-sm">
                  يعمل قسم الاتحاد العام للطلاب الموريتانيين بكلية الاقتصاد والتسيير على الدفاع عن الحقوق الأكاديمية
                  والاجتماعية للطلاب، وتمثيلهم تمثيلًا مسؤولًا أمام إدارة الكلية، والمساهمة في تحسين الظروف الدراسية
                  ونشر الوعي الطلابي في جو من الانضباط والاحترام.
                </p>
              </motion.article>
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="mission" className="mt-3 grid gap-3">
            <motion.article className="section-card" variants={cardIn} initial="hidden" animate="show">
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <Megaphone size={18} className="text-yellow-700 dark:text-yellow-300" />
                رسالة القسم
              </h2>
              <p className="mt-2 text-sm">
                تمثيل الطلاب تمثيلًا مسؤولًا، نقل انشغالاتهم ومطالبهم بشكل منظم، نشر الوعي الطلابي، والمساهمة في
                استقرار وتحسين العملية التعليمية داخل الكلية.
              </p>
            </motion.article>

            <motion.section
              className="grid gap-3 sm:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {missionItems.map((item) => (
                <motion.article key={item} className="section-card animated-border-card" variants={cardIn}>
                  <div className="section-content">
                    <p className="text-sm font-semibold">{item}</p>
                  </div>
                </motion.article>
              ))}
            </motion.section>
          </Tabs.Content>

          <Tabs.Content value="team" className="mt-3 grid gap-3">
            <motion.section className="section-card" variants={fadeUp} initial="hidden" animate="show">
              <div className="section-content">
                <h2 className="text-xl font-black">تشكيلة مكتب القسم</h2>
                <p className="ui-muted mt-2">اختر الفئة ثم اضغط على المنصب لعرض الاسم بطريقة منظمة.</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setTeamView((prev) => (prev === "leaders" ? null : "leaders"));
                      setSelectedMember(null);
                    }}
                    className={`ui-action border ${teamView === "leaders" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    القيادة
                  </button>
                  <button
                    onClick={() => {
                      setTeamView((prev) => (prev === "officials" ? null : "officials"));
                      setSelectedMember(null);
                    }}
                    className={`ui-action border ${teamView === "officials" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    المسؤولون
                  </button>
                  <button
                    onClick={() => {
                      setTeamView((prev) => (prev === "deputies" ? null : "deputies"));
                      setSelectedMember(null);
                    }}
                    className={`ui-action border ${teamView === "deputies" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    النواب
                  </button>
                </div>
              </div>
            </motion.section>

            {teamView && (
              <motion.section className="section-card" variants={cardIn} initial="hidden" animate="show">
                <h3 className="text-lg font-black">{teamTitleMap[teamView]}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeMembers.map((member, idx) => (
                    <button
                      key={`${member.role}-${member.name}`}
                      onClick={() => setSelectedMember((prev) => (prev === idx ? null : idx))}
                      className={`ui-action border ${selectedMember === idx ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                    >
                      {member.role}
                    </button>
                  ))}
                </div>

                {activeMember ? (
                  <motion.div
                    key={`${teamView}-${selectedMember}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-300">{activeMember.role}</p>
                    <p className="mt-1 text-base font-black">{activeMember.name}</p>
                  </motion.div>
                ) : (
                  <p className="ui-muted mt-3">اختر منصبًا لعرض الاسم.</p>
                )}
              </motion.section>
            )}
          </Tabs.Content>

          <Tabs.Content value="contact" className="mt-3 grid gap-3 md:grid-cols-2">
            <motion.article className="section-card" variants={cardIn} initial="hidden" animate="show">
              <h2 className="text-xl font-black">وسائل التواصل</h2>
              <div className="mt-3 grid gap-2">
                <a
                  href="https://www.facebook.com/UGEMFEG"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900"
                >
                  صفحة فيسبوك الرسمية
                  <Facebook size={16} />
                </a>
                <a
                  href="tel:+22231682774"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900"
                >
                  مسؤول الإعلام: +222 31 68 27 74
                  <Phone size={16} />
                </a>
                <a
                  href="tel:+22248539265"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900"
                >
                  رئيس القسم: +222 48 53 92 65
                  <Phone size={16} />
                </a>
                <a
                  href="/groupes"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900"
                >
                  مجموعات واتساب حسب التخصص والمستوى الدراسي
                  <MessageCircle size={16} />
                </a>
              </div>
            </motion.article>

            <motion.article
              className="section-card border-red-300/60 bg-red-50/80 dark:bg-red-500/10"
              variants={cardIn}
              initial="hidden"
              animate="show"
            >
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <ShieldCheck size={18} className="text-red-700 dark:text-red-300" />
                تنبيه مهم للطلاب
              </h2>
              <p className="mt-2 text-sm font-bold text-red-700 dark:text-red-300">
                كل ما يُنشر عن قسم الاتحاد مبني على معلومات مؤكدة من الإدارة أو مصادر رسمية.
              </p>
              <p className="mt-2 text-sm font-bold text-red-700 dark:text-red-300">
                يرجى عدم تداول الإشاعات، والتواصل مع ممثلي الاتحاد مباشرة عند أي استفسار.
              </p>
              <p className="mt-3 text-sm">
                الاتحاد العام للطلاب الموريتانيين هو صوت الطالب داخل كلية الاقتصاد والتسيير، وقوته في وعي الطلاب،
                تنظيمهم، وتعاونهم.
              </p>
            </motion.article>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
