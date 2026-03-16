"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLang } from "@/lib/i18n";
import {
  ArrowUpLeft,
  ArrowUpRight,
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
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const ActionArrow = lang === "fr" ? ArrowUpRight : ArrowUpLeft;
  const sectionHighlights = useMemo(
    () =>
      lang === "fr"
        ? ["Navigation plus rapide", "Sections essentielles", "Acces direct"]
        : ["تنقل أسرع", "الأقسام الأساسية", "وصول مباشر"],
    [lang]
  );

  const variants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.04 },
      },
    }),
    []
  );

  const item = useMemo<Variants>(
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

  useEffect(() => {
    fetch("/api/site-assets")
      .then((res) => res.json() as Promise<{ urls?: string[]; url?: string }>)
      .then((data) => {
        if (Array.isArray(data.urls) && data.urls.length) {
          setExtraImages(data.urls.filter(Boolean));
          return;
        }
        if (typeof data.url === "string" && data.url.trim()) {
          setExtraImages([data.url]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="cards-shell" id="discover">
      <div className="cards-head">
        <div className="cards-head-copy">
          <span className="cards-kicker">{lang === "fr" ? "Sections principales" : "الأقسام الرئيسية"}</span>
          <h2 className="cards-title">
            {lang === "fr" ? "Accedez vite a ce dont vous avez besoin" : "ادخل بسرعة إلى ما تحتاجه"}
          </h2>
          <p className="cards-desc">
            {lang === "fr"
              ? "Toutes les parties importantes du site sont regroupees ici pour reduire le temps de recherche."
              : "جمعنا أهم أقسام الموقع في مكان واحد لتصل إلى الأخبار والملفات والروابط بأقل عدد من الخطوات."}
          </p>
        </div>
        <div className="cards-highlight-row">
          {sectionHighlights.map((item) => (
            <span key={item} className="cards-highlight-pill">
              {item}
            </span>
          ))}
        </div>
      </div>

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
                  <div className="home-card-topline">
                    <span className="home-card-badge">{lang === "fr" ? "Ouvrir" : "افتح"}</span>
                    <span className="home-card-index">{String(cards.indexOf(card) + 1).padStart(2, "0")}</span>
                  </div>
                  <motion.div className="home-card-icon-wrap" whileHover={reduce ? undefined : { rotate: 8, y: -2 }} transition={{ type: "spring", stiffness: 360, damping: 14 }}>
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
                  <div className="home-card-action">
                    <span>{lang === "fr" ? "Entrer dans la section" : "الدخول إلى القسم"}</span>
                    <ActionArrow size={15} />
                  </div>

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

      <div className="home-collage-stage">
        <div className="home-collage-caption">
          <span className="home-collage-kicker">{lang === "fr" ? "Vie etudiante" : "الحياة الطلابية"}</span>
          <h3 className="home-collage-title">
            {lang === "fr" ? "Un apercu des activites et initiatives UGEM" : "لمحة من الأنشطة والمبادرات داخل الاتحاد"}
          </h3>
        </div>
        <div className="home-collage">
          <img
            src="/publicugem-collage.jpg"
            alt="لقطات من أنشطة الاتحاد العام للطلاب الموريتانيين"
            className="home-collage-img"
            loading="lazy"
          />
        </div>
      </div>
      {extraImages.length
        ? extraImages.map((img) => (
            <div key={img} className="home-collage home-collage-extra">
              <img
                src={img}
                alt="صورة جديدة من الإدارة"
                className="home-collage-img"
                loading="lazy"
              />
            </div>
          ))
        : null}
    </section>
  );
}
