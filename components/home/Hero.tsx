"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { t, lang } = useLang();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(40);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile || reduce) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMx(x);
      setMy(y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  const words = useMemo(
    () => t("hero.title").split(" "),
    [t]
  );

  const goFromSearch = () => {
    const value = query.trim().toLowerCase();
    if (!value) return;

    if (value.includes("اعلان") || value.includes("annonce")) {
      router.push("/annonces");
      return;
    }
    if (value.includes("ارشيف") || value.includes("archive")) {
      router.push("/archive");
      return;
    }
    if (value.includes("تخصص") || value.includes("special")) {
      router.push("/specialites");
      return;
    }
    if (value.includes("جدول") || value.includes("emploi")) {
      router.push("/timetables");
      return;
    }
    if (value.includes("مراجعة") || value.includes("revision")) {
      router.push("/reviews");
      return;
    }

    router.push("/annonces");
  };

  const container = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 140, damping: 18 } },
  };

  return (
    <section className="hero-shell">
      <div
        className="hero-spotlight"
        style={{ background: `radial-gradient(380px at ${mx}% ${my}%, rgba(255,255,255,0.7), transparent 62%)` }}
      />

      <motion.div className="hero-orb hero-orb-a" animate={reduce ? undefined : { y: [-8, 8, -8], x: [-6, 6, -6] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="hero-orb hero-orb-b" animate={reduce ? undefined : { y: [10, -10, 10], x: [8, -8, 8] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="hero-orb hero-orb-c" animate={reduce ? undefined : { y: [-12, 6, -12], x: [5, -5, 5] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

      <div className="hero-noise" />

      <motion.div className="hero-inner" variants={container} initial="hidden" animate="show">
        <motion.div className="hero-search" variants={item}>
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goFromSearch();
            }}
            placeholder={t("hero.search")}
            className="hero-search-input"
          />
          <button type="button" className="hero-search-btn" onClick={goFromSearch}>
            {lang === "fr" ? "Aller" : "اذهب"}
          </button>
        </motion.div>

        <motion.div className="hero-logo-wrap" variants={item} animate={reduce ? undefined : { y: [0, -7, 0], boxShadow: ["0 8px 22px rgba(0,0,0,0.12)", "0 16px 30px rgba(0,0,0,0.18)", "0 8px 22px rgba(0,0,0,0.12)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <img src="/ugem-logo.jpg" alt="UGEM" className="hero-logo" />
        </motion.div>

        <motion.h1 className="hero-title" variants={item}>
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              className="hero-word"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.04, duration: 0.35 }}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p className="hero-gold" variants={item}>{t("hero.fac")}</motion.p>

        <motion.p className="hero-desc" variants={item}>
          {t("hero.desc")}
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <motion.a
            href="https://tinyurl.com/5fcndzzt"
            target="_blank"
            rel="noreferrer"
            className="btn-shimmer btn-dark"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 330, damping: 18 }}
          >
            <GraduationCap size={18} />
            <span>{t("nav.results")}</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
