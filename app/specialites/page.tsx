"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Atom, BookOpen, GraduationCap, Layers3 } from "lucide-react";
import {
  cardIn,
  easeOutExpo,
  fadeUp,
  springTransition,
  staggerContainer,
} from "@/components/motion/variants";

type Level = "L1" | "L2" | "L3";
type Semester = { id: string; title: string; subjects: string[] };
type Specialite = { code: string; name: string; level: Level; semesters: Semester[] };

const SPECIALITES: Specialite[] = [
  {
    code: "ECO",
    name: "Economie - Tronc commun",
    level: "L1",
    semesters: [
      { id: "S1", title: "Semestre 1 (S1)", subjects: ["Micro-economie 1", "Macro-economie 1", "Histoire des faits economiques", "Mathematiques", "Introduction a l'etude du droit", "Comptabilite generale 1", "Economie d'entreprise", "Arabe 1"] },
      { id: "S2", title: "Semestre 2 (S2)", subjects: ["Micro-economie 2", "Macro-economie 2", "Demographie", "Statistiques descriptives 2", "Economie d'entreprise 2", "Droit des contrats", "Comptabilite generale 2", "Arabe 2"] },
    ],
  },
  {
    code: "GRH",
    name: "Gestion des Ressources Humaines",
    level: "L1",
    semesters: [
      { id: "S1", title: "Semestre 1 (S1)", subjects: ["Principe de gestion", "Comptabilite financiere 1", "Mathematiques", "Statistiques descriptives 1", "Introduction au droit", "Introduction a l'economie", "Technique de communication 1", "Methodologie de travail universitaire", "Bureautique 1", "Anglais 1"] },
      { id: "S2", title: "Semestre 2 (S2)", subjects: ["Gestion administrative des RH", "Paie", "Gestion financiere 1", "Comptabilite financiere 2", "Droit du travail", "Statistiques descriptives 2", "Droit des obligations", "Technique de communication 2", "Bureautique 2", "Anglais 2"] },
    ],
  },
  {
    code: "BA",
    name: "Banque et Assurance",
    level: "L1",
    semesters: [
      { id: "S1", title: "Semestre 1 (S1)", subjects: ["Principe de gestion", "Comptabilite financiere 1", "Mathematiques", "Statistiques descriptives 1", "Introduction au droit", "Introduction a l'economie", "Technique de communication 1", "Methodologie de travail universitaire", "Bureautique 1", "Anglais 1"] },
      { id: "S2", title: "Semestre 2 (S2)", subjects: ["Comptabilite financiere", "Micro-finance", "Economie d'entreprise", "Statistiques descriptives 2", "Mathematiques financieres", "Micro-economie", "Macro-economie", "Technique de communication 2", "Bureautique 2", "Anglais 2"] },
    ],
  },
  {
    code: "FC",
    name: "Finance et Comptabilite",
    level: "L1",
    semesters: [
      { id: "S1", title: "Semestre 1 (S1)", subjects: ["Principe de gestion", "Comptabilite financiere 1", "Mathematiques", "Statistiques descriptives 1", "Introduction au droit", "Introduction a l'economie", "Technique de communication 1", "Methodologie de travail universitaire", "Bureautique 1", "Anglais 1"] },
      { id: "S2", title: "Semestre 2 (S2)", subjects: ["Comptabilite financiere", "Micro-finance", "Economie d'entreprise", "Statistiques descriptives 2", "Mathematiques financieres", "Micro-economie", "Macro-economie", "Technique de communication 2", "Bureautique 2", "Anglais 2"] },
    ],
  },
  {
    code: "EG",
    name: "Economie et Gestion",
    level: "L2",
    semesters: [
      { id: "S3", title: "Semestre 3 (S3)", subjects: ["Macro-economie 3", "Micro-economie 3", "Mathematiques 2", "Comptabilite des societes", "Statistique 2", "P.E.C", "Droit commercial", "Arabe 3", "Anglais 1"] },
      { id: "S4", title: "Semestre 4 (S4)", subjects: ["Macro-economie 4", "Micro-economie 4", "Statistique 3", "Comptabilite analytique", "Mathematiques 3", "Monnaie et credit", "Droit du travail", "Finances publiques", "Arabe 4", "Anglais 2"] },
    ],
  },
  {
    code: "GRH",
    name: "Gestion des Ressources Humaines",
    level: "L2",
    semesters: [
      { id: "S3", title: "Semestre 3 (S3)", subjects: ["GEPEC", "Recrutement", "Evaluation de competence", "Gestion financiere 2", "Analyse financiere", "Droit du travail 2", "Hygiene et securite de travail", "Logiciel paie", "Anglais des affaires", "Redaction administrative"] },
      { id: "S4", title: "Semestre 4 (S4)", subjects: ["Bilan social", "Plan et ingenierie de formation", "Securite sociale", "Economie du travail", "Leadership et habiletes de direction", "Sociologie du travail", "Droit du travail 3", "Droit administratif", "Redaction administrative 2", "Communication interne 1", "Systeme d'information RH"] },
    ],
  },
  {
    code: "FC",
    name: "Finance et Comptabilite",
    level: "L2",
    semesters: [
      { id: "S3", title: "Semestre 3 (S3)", subjects: ["Strategie d'entreprise", "Comptabilite des societes 1", "Systeme financier mauritanien", "Entreprise et Banques", "Marketing", "Logiciels comptables", "Anglais des affaires", "Droit administratif", "Droit commercial", "Methodes d'aide a la decision"] },
      { id: "S4", title: "Semestre 4 (S4)", subjects: ["Comptabilite des societes 2", "Comptabilite analytique", "Analyse financiere", "Finance islamique", "Gestion de portefeuilles", "Finance des marches", "Fiscalite", "Instruments de credit", "Droit du travail", "Gestion des Ressources Humaines"] },
    ],
  },
  {
    code: "BA",
    name: "Banque et Assurance",
    level: "L2",
    semesters: [
      { id: "S3", title: "Semestre 3 (S3)", subjects: ["Comptabilite de societes", "Anglais des affaires", "Droit administratif", "Marketing", "Droit commercial", "Entreprise et Banque", "Systeme financier mauritanien", "Methodes d'aide a la decision", "Strategie d'entreprise", "Logiciels comptables"] },
      { id: "S4", title: "Semestre 4 (S4)", subjects: ["Comptabilite bancaire 3", "Assurance des biens et personnes 4", "Technique bancaire 3", "Finance islamique 2", "Finance des marches 4", "Analyse financiere 4", "Commerce international 2", "Droit des assurances 4", "Logiciel bancaire 2", "Gestion des ressources humaines 2"] },
    ],
  },
  {
    code: "FC",
    name: "Finance et Comptabilite",
    level: "L3",
    semesters: [
      { id: "S5", title: "Semestre 5 (S5)", subjects: ["Gestion de tresorerie", "Controle de gestion", "Analyse financiere approfondie", "Methode d'evaluation d'entreprise", "Marches financiers", "Audit financier", "Normes comptables internationales", "Choix d'investissement", "Droit bancaire et financier", "Initiation au milieu professionnel"] },
      { id: "S6", title: "Semestre 6 (S6)", subjects: ["Project"] },
    ],
  },
  {
    code: "GRH",
    name: "Gestion des Ressources Humaines",
    level: "L3",
    semesters: [
      { id: "S5", title: "Semestre 5 (S5)", subjects: ["Source de motivation du personnel", "Politique de remuneration", "Audit des ressources humaines", "Droit penal general", "Communication interne 2", "Sociologie des organisations", "Outils de pilotage RH", "Dialogue et climat social", "Gestion des connaissances", "Initiation au milieu professionnel"] },
      { id: "S6", title: "Semestre 6 (S6)", subjects: ["Project"] },
    ],
  },
  {
    code: "BA",
    name: "Banque et Assurance",
    level: "L3",
    semesters: [
      { id: "S5", title: "Semestre 5 (S5)", subjects: ["Gestion portefeuille", "Comptabilite bancaire 2", "Gestion des risques", "Finance islamique 2", "Analyse financiere approfondie", "Gestion de patrimoine", "Fiscalite", "Choix d'investissement", "Droit bancaire et financier", "Initiation au milieu professionnel"] },
      { id: "S6", title: "Semestre 6 (S6)", subjects: ["Project"] },
    ],
  },
  {
    code: "GAP",
    name: "Gestion Administrative Publique",
    level: "L3",
    semesters: [
      { id: "S5", title: "Semestre 5 (S5)", subjects: ["Administration publique", "Finances publiques", "Droit administratif", "Gestion des collectivites", "Politiques publiques"] },
      { id: "S6", title: "Semestre 6 (S6)", subjects: ["Pilotage des services publics", "Evaluation des politiques", "Ethique administrative", "Projet GAP", "Stage en administration"] },
    ],
  },
  {
    code: "GPT",
    name: "Gestion de Projet Technique",
    level: "L3",
    semesters: [
      { id: "S5", title: "Semestre 5 (S5)", subjects: ["Planification de projet", "Outils de pilotage", "Gestion des couts", "Qualite et risques", "Communication de projet"] },
      { id: "S6", title: "Semestre 6 (S6)", subjects: ["Management operationnel", "Suivi et evaluation", "Methodes agiles", "Projet GPT", "Stage technique"] },
    ],
  },
];

export default function SpecialitesPage() {
  const reduceMotion = useReducedMotion();
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [openSpecialiteKey, setOpenSpecialiteKey] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  const levels: Level[] = ["L1", "L2", "L3"];
  const levelStyles: Record<Level, { pill: string; button: string; card: string }> = {
    L1: {
      pill: "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-300",
      button: "bg-emerald-500 text-white",
      card: "from-emerald-50/80 to-white dark:from-emerald-500/10 dark:to-slate-900",
    },
    L2: {
      pill: "border-sky-300 bg-sky-100 text-sky-800 dark:border-sky-500/40 dark:bg-sky-500/20 dark:text-sky-300",
      button: "bg-sky-500 text-white",
      card: "from-sky-50/80 to-white dark:from-sky-500/10 dark:to-slate-900",
    },
    L3: {
      pill: "border-violet-300 bg-violet-100 text-violet-800 dark:border-violet-500/40 dark:bg-violet-500/20 dark:text-violet-300",
      button: "bg-violet-500 text-white",
      card: "from-violet-50/80 to-white dark:from-violet-500/10 dark:to-slate-900",
    },
  };

  const list = useMemo(
    () => (activeLevel ? SPECIALITES.filter((item) => item.level === activeLevel) : []),
    [activeLevel],
  );

  return (
    <div className="page-shell">
      <div className="container">
        <motion.section className="section-card app-hero-specialites" variants={fadeUp} initial="hidden" animate="show">
          <div className="section-content">
            <span className="app-hero-icon app-hero-icon-green">
              <GraduationCap size={18} />
            </span>
            <h1 className="mt-3 text-2xl font-black md:text-3xl">تخصصات الكلية</h1>
            <p className="ui-muted mt-3">
              اختر السنة الدراسية، ثم اضغط عرض المواد لاظهار المواد بشكل بسيط داخل نفس البطاقة.
            </p>
          </div>
        </motion.section>

        <section className="section-card mt-3">
          <div className="section-content">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              المراجعات وشروحات التخصصات متاحة على قناة تيليجرام:
            </p>
            <a
              href="https://t.me/FEGugem"
              target="_blank"
              rel="noreferrer"
              className="ui-action mt-2 inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-black text-white hover:bg-sky-500"
            >
              t.me/FEGugem
            </a>
          </div>
        </section>

        <section className="section-card mt-3">
          <div className="section-content">
            <div className="relative inline-flex flex-wrap gap-2 rounded-xl bg-slate-100/80 p-1 dark:bg-slate-800/70">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setActiveLevel((prev) => (prev === level ? null : level));
                    setOpenSpecialiteKey(null);
                    setExpandedSemester(null);
                  }}
                  className={`relative z-10 rounded-lg px-4 py-2 text-sm font-black transition ${
                    activeLevel === level
                      ? "text-slate-900 dark:text-slate-900"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  }`}
                >
                  {activeLevel === level && (
                    <motion.span
                      layoutId="specialites-level-pill"
                      className="absolute inset-0 rounded-lg bg-emerald-500"
                      transition={{ duration: 0.25, ease: easeOutExpo }}
                    />
                  )}
                  <span className="relative">{level}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeLevel ? (
          <AnimatePresence mode="wait">
            <motion.section
              key={activeLevel}
              className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
            >
              {list.map((item) => {
                const itemKey = `${item.level}-${item.code}-${item.name}`;
                const isOpen = openSpecialiteKey === itemKey;
                const style = levelStyles[item.level];
                return (
                  <motion.article
                    key={itemKey}
                    className={`section-card animated-border-card bg-gradient-to-br ${style.card}`}
                    variants={cardIn}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={springTransition}
                  >
                    <div className="section-content">
                      <div className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-black ${style.pill}`}>
                        <Layers3 size={12} />
                        {item.level}
                      </div>
                      <h2 className="mt-2 inline-flex items-center gap-2 text-lg font-black">
                        <Atom size={16} className="text-emerald-600 dark:text-emerald-300" />
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">({item.code})</p>

                      <button
                        onClick={() => {
                          if (isOpen) {
                            setOpenSpecialiteKey(null);
                            setExpandedSemester(null);
                            return;
                          }
                          setOpenSpecialiteKey(itemKey);
                          setExpandedSemester(null);
                        }}
                        className={`ui-action cta-shine mt-3 inline-flex items-center gap-2 text-sm font-black ${style.button}`}
                      >
                        <BookOpen size={15} />
                        عرض المواد
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.22, ease: easeOutExpo }}
                            className="mt-3 grid gap-2"
                          >
                            {item.semesters.map((semester, idx) => {
                              const semesterKey = `${itemKey}-${semester.id}`;
                              const open = expandedSemester === semesterKey;
                              return (
                                <div
                                  key={semester.id}
                                  className={`rounded-xl border ${
                                    idx % 2 === 0
                                      ? "border-amber-200 bg-amber-50/70 dark:border-amber-500/30 dark:bg-amber-500/10"
                                      : "border-cyan-200 bg-cyan-50/70 dark:border-cyan-500/30 dark:bg-cyan-500/10"
                                  }`}
                                >
                                  <button
                                    onClick={() => setExpandedSemester(open ? null : semesterKey)}
                                    className="ui-action flex w-full items-center justify-between px-3 py-2 text-right text-sm font-black"
                                  >
                                    <span>{semester.title}</span>
                                    <span>{open ? "-" : "+"}</span>
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {open && (
                                      <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: easeOutExpo }}
                                        className="space-y-1 overflow-hidden px-3 pb-3 text-sm"
                                      >
                                        {semester.subjects.map((subject) => (
                                          <li key={subject}>- {subject}</li>
                                        ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                );
              })}
            </motion.section>
          </AnimatePresence>
        ) : (
          <section className="section-card mt-3">
            <p className="ui-muted">اختر سنة دراسية لعرض التخصصات.</p>
          </section>
        )}
      </div>
    </div>
  );
}
