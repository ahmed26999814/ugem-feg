"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import {
  House,
  BellRing,
  FolderArchive,
  Landmark,
  Star,
  MessagesSquare,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

type CardItem = {
  titleKey: string;
  desc: { ar: string; fr: string };
  href: string;
  icon?: LucideIcon;
  logo?: boolean;
  gradient: string;
};

const cards: CardItem[] = [
  { titleKey: "nav.home", desc: { ar: "الواجهة الرئيسية", fr: "Page principale" }, href: "/", icon: House, gradient: "from-indigo-600 to-blue-500" },
  { titleKey: "nav.annonces", desc: { ar: "آخر الأخبار الرسمية", fr: "Actualités officielles" }, href: "/annonces", icon: BellRing, gradient: "from-purple-600 to-fuchsia-500" },
  { titleKey: "nav.archive", desc: { ar: "ملفات ومحاضرات PDF", fr: "Fichiers et supports PDF" }, href: "/archive", icon: FolderArchive, gradient: "from-sky-700 to-cyan-500" },
  { titleKey: "nav.reviews", desc: { ar: "المراجعات", fr: "Revisions" }, href: "/reviews", icon: Star, gradient: "from-violet-700 to-indigo-500" },
  { titleKey: "nav.feg", desc: { ar: "معلومات عن الكلية", fr: "Infos sur la faculté" }, href: "/feg", icon: Landmark, gradient: "from-pink-700 to-rose-500" },
  { titleKey: "nav.ugem", desc: { ar: "عن قسم الاتحاد", fr: "Section UGEM" }, href: "/ugem", logo: true, gradient: "from-teal-700 to-emerald-500" },
  { titleKey: "nav.groups", desc: { ar: "روابط المجموعات", fr: "Liens des groupes" }, href: "/groupes", icon: MessagesSquare, gradient: "from-green-700 to-lime-500" },
  { titleKey: "nav.specialites", desc: { ar: "كل التخصصات", fr: "Toutes les spécialités" }, href: "/specialites", icon: GraduationCap, gradient: "from-orange-600 to-amber-400" },
];

export default function HomeCards() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; key: string }[]>([]);

  const variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.04 },
      },
    }),
    []
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, scale: 0.94 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 170, damping: 18 },
      },
    }),
    []
  );

  return (
    <section className="cards-shell">
      <motion.div className="cards-grid" variants={variants} initial="hidden" animate="show">
        {cards.map((card) => {
          const Icon = card.icon;
          const key = card.href;
          return (
            <motion.div key={card.href} variants={item}>
              <Link href={card.href}>
                <motion.article
                  className={`home-card bg-gradient-to-br ${card.gradient}`}
                  whileHover={reduce ? undefined : { y: -6, scale: 1.03 }}
                  whileTap={reduce ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onMouseMove={(e) => {
                    if (reduce) return;
                    const target = e.currentTarget;
                    const rect = target.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rx = ((y / rect.height) * 2 - 1) * -4;
                    const ry = ((x / rect.width) * 2 - 1) * 4;
                    target.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                    target.style.setProperty("--sx", `${x}px`);
                    target.style.setProperty("--sy", `${y}px`);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const id = Date.now();
                    setRipples((prev) => [...prev, { id, x, y, key }]);
                    setTimeout(() => {
                      setRipples((prev) => prev.filter((r) => r.id !== id));
                    }, 450);
                  }}
                >
                  <div className="card-spot" />
                  <motion.div whileHover={reduce ? undefined : { rotate: 8, y: -2 }} transition={{ type: "spring", stiffness: 360, damping: 14 }}>
                    {card.logo ? (
                      <img
                        src="/ugem-logo.jpg"
                        alt="UGEM"
                        className="h-12 w-12 rounded-full border border-white/70 object-cover shadow-md"
                      />
                    ) : (
                      Icon && <Icon size={46} className="text-white" />
                    )}
                  </motion.div>
                  <h3 className="home-card-title">{t(card.titleKey)}</h3>
                  <p className="home-card-subtitle">{lang === "fr" ? card.desc.fr : card.desc.ar}</p>

                  {ripples
                    .filter((r) => r.key === key)
                    .map((r) => (
                      <span
                        key={r.id}
                        className="ripple"
                        style={{ left: r.x, top: r.y }}
                      />
                    ))}
                </motion.article>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="home-collage">
        <img
          src="/publicugem-collage.jpg"
          alt="لقطات من أنشطة الاتحاد العام للطلاب الموريتانيين"
          className="home-collage-img"
          loading="lazy"
        />
      </div>
    </section>
  );
}
