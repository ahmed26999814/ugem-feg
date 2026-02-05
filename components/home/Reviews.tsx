"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "طالب سنة أولى", text: "الموقع سهل علينا الوصول للإعلانات والجداول بسرعة كبيرة." },
  { name: "طالبة تخصص GRH", text: "تنظيم المواد ممتاز، وكل شيء واضح ومحدث." },
  { name: "طالب L3", text: "أفضل منصة طلابية في الكلية من ناحية السرعة وسهولة الاستخدام." },
];

export default function Reviews() {
  return (
    <section className="container mt-2 mb-3">
      <motion.div
        className="section-card"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="text-xl font-black">مراجعات الطلاب</h2>
        <p className="ui-muted mt-1">آراء حقيقية من مستخدمي منصة الاتحاد.</p>

        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {reviews.map((item) => (
            <article key={item.name} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-2 flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-sm">{item.text}</p>
              <p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">{item.name}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

