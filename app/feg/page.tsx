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
              <h1 className="text-2xl font-black md:text-4xl">ÙƒÙ„ÙŠØ© Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ ÙˆØ§Ù„ØªØ³ÙŠÙŠØ± (FEG)</h1>
              <p className="mt-1 text-sm font-bold text-yellow-700 dark:text-yellow-300">
                Ø¬Ø§Ù…Ø¹Ø© Ù†ÙˆØ§ÙƒØ´ÙˆØ· Ø§Ù„Ø¹ØµØ±ÙŠØ© - Nouakchott - Mauritanie
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
              Ø§Ù„Ø§Ù†ØªÙ…Ø§Ø¡ ÙˆØ§Ù„Ù†Ø´Ø£Ø©
            </Tabs.Trigger>
            <Tabs.Trigger
              value="programs"
              className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100"
            >
              Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬ ÙˆØ§Ù„ØªØ®ØµØµØ§Øª
            </Tabs.Trigger>
            <Tabs.Trigger
              value="infra"
              className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100"
            >
              Ø§Ù„Ø¨Ù†ÙŠØ© ÙˆØ§Ù„Ø£Ù†Ø´Ø·Ø©
            </Tabs.Trigger>
            <Tabs.Trigger
              value="admin"
              className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100"
            >
              Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© ÙˆØ§Ù„Ù…ØµØ§Ø¯Ø±
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="institution" className="mt-3 grid gap-3">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3">
            <motion.article className="section-card" variants={cardIn}>
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <Landmark size={18} className="text-yellow-700 dark:text-yellow-300" />
                Ø§Ù„Ø§Ù†ØªÙ…Ø§Ø¡ Ø§Ù„Ù…Ø¤Ø³Ø³ÙŠ
              </h2>
              <p className="mt-2 text-sm">
                ÙƒÙ„ÙŠØ© Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ ÙˆØ§Ù„ØªØ³ÙŠÙŠØ± Ù‡ÙŠ Ø¥Ø­Ø¯Ù‰ ÙƒÙ„ÙŠØ§Øª Ø¬Ø§Ù…Ø¹Ø© Ù†ÙˆØ§ÙƒØ´ÙˆØ· Ø§Ù„Ø¹ØµØ±ÙŠØ© (UniversitÃ© de Nouakchott Al Aasriya)ØŒ
                ÙˆÙ‡ÙŠ Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¹Ù…ÙˆÙ…ÙŠØ© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ© ÙÙŠ Ø§Ù„Ø¹Ø§ØµÙ…Ø© Ù†ÙˆØ§ÙƒØ´ÙˆØ·ØŒ Ù…ÙˆØ±ÙŠØªØ§Ù†ÙŠØ§.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>ØªØ£Ø³Ø³Øª Ø§Ù„Ø¬Ø§Ù…Ø¹Ø©: 1981</Badge>
                <Badge>Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªÙ†Ø¸ÙŠÙ…: 2016</Badge>
              </div>
            </motion.article>

            <motion.article className="section-card" variants={cardIn}>
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <CalendarClock size={18} className="text-yellow-700 dark:text-yellow-300" />
                Ù†Ø´Ø£Ø© Ø§Ù„ÙƒÙ„ÙŠØ© ÙˆØªØ·ÙˆØ±Ù‡Ø§
              </h2>
              <p className="mt-2 text-sm">
                Ø®Ù„Ø§Ù„ Ø§Ù„Ø³Ù†ÙˆØ§Øª Ø§Ù„Ø£Ø®ÙŠØ±Ø© ÙˆØ®ØµÙˆØµÙ‹Ø§ ÙÙŠ Ø³Ù†Ø© 2025 ØªÙ… ÙØµÙ„ Ù‚Ø³Ù… Ø§Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ÙŠØ© Ø¹Ù† Ø§Ù„ÙƒÙ„ÙŠØ© Ø§Ù„Ø³Ø§Ø¨Ù‚Ø©ØŒ ÙˆØ¥Ù†Ø´Ø§Ø¡
                ÙƒÙ„ÙŠØ© Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ ÙˆØ§Ù„ØªØ³ÙŠÙŠØ± ÙƒÙƒÙ„ÙŠØ© Ù…Ø³ØªÙ‚Ù„Ø© ÙÙŠ Ø¥Ø·Ø§Ø± Ù‡ÙŠÙƒÙ„Ø© Ø§Ù„Ø¬Ø§Ù…Ø¹Ø© ÙˆØªÙˆØ¶ÙŠØ­ Ø§Ù„ØªØ®ØµØµØ§Øª ÙˆØªØ­Ø³ÙŠÙ† Ø¬ÙˆØ¯Ø© Ø§Ù„ØªÙƒÙˆÙŠÙ† Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ.
              </p>
            </motion.article>
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="programs" className="mt-3 grid gap-3">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3">
            <motion.article className="section-card" variants={cardIn}>
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <GraduationCap size={18} className="text-yellow-700 dark:text-yellow-300" />
                Ù†Ø¸Ø§Ù… Ø§Ù„Ø¯Ø±Ø§Ø³Ø©
              </h2>
              <p className="mt-2 text-sm">ØªØ¹ØªÙ…Ø¯ Ø§Ù„ÙƒÙ„ÙŠØ© Ù†Ø¸Ø§Ù… LMD: Licence - Master - Doctorat Ù…Ø¹ Ù…Ø³ØªÙˆÙŠØ§Øª L1 ÙˆL2 ÙˆL3.</p>
            </motion.article>

            <motion.article className="section-card" variants={cardIn}>
              <h3 className="text-lg font-black">Ø§Ù„ØªØ®ØµØµØ§Øª Ø§Ù„Ù…Ø¹ØªÙ…Ø¯Ø©</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <h4 className="font-black">L1</h4>
                  <p className="mt-1 text-sm">Ø¬Ø°Ø¹ Ù…Ø´ØªØ±Ùƒ (Ù†Ø¸Ø§Ù… LMD)</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <h4 className="font-black">L2</h4>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>- Ã‰conomie - Gestion</li>
                    <li>- Finance et ComptabilitÃ© (FC)</li>
                    <li>- Gestion des Ressources Humaines (GRH)</li>
                    <li>- Banque et Assurance (BA)</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <h4 className="font-black">L3</h4>
                  <ul className="mt-1 space-y-1 text-sm">
                    <li>- Gestion Administrative Publique (GAP)</li>
                    <li>- Gestion de Projet Technique (GPT)</li>
                    <li>- Finance et ComptabilitÃ© (FC)</li>
                    <li>- Gestion des Ressources Humaines (GRH)</li>
                    <li>- Banque et Assurance (BA)</li>
                  </ul>
                </div>
              </div>
            </motion.article>

            <motion.article className="section-card" variants={cardIn}>
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <Languages size={18} className="text-yellow-700 dark:text-yellow-300" />
                Ù„ØºØ© Ø§Ù„ØªØ¯Ø±ÙŠØ³
              </h2>
              <p className="mt-2 text-sm">
                Ø§Ù„Ù„ØºØ© Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© Ù„Ù„ØªØ¯Ø±ÙŠØ³ Ù‡ÙŠ Ø§Ù„Ù„ØºØ© Ø§Ù„ÙØ±Ù†Ø³ÙŠØ©ØŒ ÙˆØªØ³ØªØ¹Ù…Ù„ Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© ÙÙŠ Ø¨Ø¹Ø¶ Ø§Ù„Ø¬ÙˆØ§Ù†Ø¨ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ© ÙˆØ§Ù„ØªÙˆØ§ØµÙ„ÙŠØ©.
              </p>
            </motion.article>
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="infra" className="mt-3 grid gap-3">
            <motion.section className="section-card" variants={fadeUp} initial="hidden" animate="show">
              <div className="section-content">
                <h2 className="text-xl font-black">Ø§Ù„Ø¨Ù†ÙŠØ© ÙˆØ§Ù„Ø£Ù†Ø´Ø·Ø©</h2>
                <p className="ui-muted mt-2">Ø§Ø®ØªØ± Ø§Ù„ÙØ¦Ø© Ù„Ø¹Ø±Ø¶ Ø§Ù„ØªÙØ§ØµÙŠÙ„ Ø¨Ø´ÙƒÙ„ Ù…Ù†Ø¸Ù…:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setInfraView((prev) => (prev === "infra" ? null : "infra"))}
                    className={`ui-action border ${infraView === "infra" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    Ø§Ù„Ø¨Ù†ÙŠØ© Ø§Ù„ØªØ­ØªÙŠØ©
                  </button>
                  <button
                    onClick={() => setInfraView((prev) => (prev === "activities" ? null : "activities"))}
                    className={`ui-action border ${infraView === "activities" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    Ø§Ù„Ø£Ù†Ø´Ø·Ø©
                  </button>
                  <button
                    onClick={() => setInfraView((prev) => (prev === "students" ? null : "students"))}
                    className={`ui-action border ${infraView === "students" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    Ø£ÙˆØ¶Ø§Ø¹ Ø§Ù„Ø·Ù„Ø§Ø¨
                  </button>
                </div>
              </div>
            </motion.section>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3">
              {!infraView && (
                <motion.article className="section-card" variants={cardIn}>
                  <p className="ui-muted">Ø§Ø®ØªØ± Ø£Ø­Ø¯ Ø§Ù„Ø£Ø²Ø±Ø§Ø± Ø¨Ø§Ù„Ø£Ø¹Ù„Ù‰ Ù„Ø¹Ø±Ø¶ Ø§Ù„ØªÙØ§ØµÙŠÙ„.</p>
                </motion.article>
              )}
              {infraView === "infra" && (
                <motion.article className="section-card" variants={cardIn}>
                  <h2 className="inline-flex items-center gap-2 text-xl font-black">
                    <Building2 size={18} className="text-yellow-700 dark:text-yellow-300" />
                    Ø§Ù„Ø¨Ù†ÙŠØ© Ø§Ù„ØªØ­ØªÙŠØ© ÙˆØ§Ù„ØªØ¬Ù‡ÙŠØ²Ø§Øª
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setInfraDetail((prev) => (prev === "amphi" ? null : "amphi"))}
                      className={`ui-action border ${infraDetail === "amphi" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                    >
                      Ø§Ù„Ù…Ø¯Ø±Ø¬Ø§Øª
                    </button>
                    <button
                      onClick={() => setInfraDetail((prev) => (prev === "td" ? null : "td"))}
                      className={`ui-action border ${infraDetail === "td" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                    >
                      Ù‚Ø§Ø¹Ø§Øª TD
                    </button>
                    <button
                      onClick={() => setInfraDetail((prev) => (prev === "tp" ? null : "tp"))}
                      className={`ui-action border ${infraDetail === "tp" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                    >
                      Ù‚Ø§Ø¹Ø§Øª TP
                    </button>
                  </div>

                  {infraDetail === "amphi" && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Ø§Ù„Ù…Ø¯Ø±Ø¬Ø§Øª</p>
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
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Ù‚Ø§Ø¹Ø§Øª Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ÙŠØ© TD</p>
                      <p className="mt-1 text-sm">Ø­ÙˆØ§Ù„ÙŠ 68 Ù‚Ø§Ø¹Ø© Ø£Ø¹Ù…Ø§Ù„ ØªØ·Ø¨ÙŠÙ‚ÙŠØ© Ù…Ø®ØµÙ‘ØµØ© Ù„Ù„Ø¯Ø±ÙˆØ³ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ÙŠØ©.</p>
                    </div>
                  )}

                  {infraDetail === "tp" && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Ù‚Ø§Ø¹Ø§Øª Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ÙŠØ© TP</p>
                      <p className="mt-1 text-sm">3 Ù‚Ø§Ø¹Ø§Øª TP Ù…Ø®ØµÙ‘ØµØ© Ù„Ù„Ø¥Ø¹Ù„Ø§Ù…ÙŠØ§Øª ÙˆÙ…Ø¬Ù‡Ù‘Ø²Ø© Ø¨Ø§Ù„Ø­ÙˆØ§Ø³ÙŠØ¨.</p>
                    </div>
                  )}
                </motion.article>
              )}

              {infraView === "activities" && (
                <motion.article className="section-card" variants={cardIn}>
                  <h2 className="inline-flex items-center gap-2 text-xl font-black">
                    <Microscope size={18} className="text-yellow-700 dark:text-yellow-300" />
                    Ø§Ù„Ø£Ù†Ø´Ø·Ø© ÙˆØ§Ù„Ø£Ø­Ø¯Ø§Ø«
                  </h2>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>- Ø£ÙŠØ§Ù… Ø¯Ø±Ø§Ø³ÙŠØ©</li>
                    <li>- Ù†Ø¯ÙˆØ§Øª Ø¹Ù„Ù…ÙŠØ©</li>
                    <li>- Ù†Ù‚Ø§Ø´Ø§Øª Ø¹Ù„Ù…ÙŠØ© Ø­ÙˆÙ„ Ù‚Ø¶Ø§ÙŠØ§ Ø§Ù‚ØªØµØ§Ø¯ÙŠØ© ÙˆÙ…Ø§Ù„ÙŠØ©</li>
                    <li>- Ù…Ø«Ø§Ù„: Ø£ÙŠØ§Ù… Ø¯Ø±Ø§Ø³ÙŠØ© Ø­ÙˆÙ„ Ø£Ø«Ø± Ø§Ù„Ù…Ø§Ù„ÙŠØ© Ø§Ù„Ø¥Ø³Ù„Ø§Ù…ÙŠØ© ÙÙŠ Ø¥ØµÙ„Ø§Ø­ Ù‚Ø·Ø§Ø¹ Ø§Ù„ØªØ£Ù…ÙŠÙ†</li>
                  </ul>
                </motion.article>
              )}

              {infraView === "students" && (
                <motion.article className="section-card" variants={cardIn}>
                  <h2 className="inline-flex items-center gap-2 text-xl font-black">
                    <Users size={18} className="text-yellow-700 dark:text-yellow-300" />
                    Ø£ÙˆØ¶Ø§Ø¹ Ø§Ù„Ø·Ù„Ø§Ø¨
                  </h2>
                  <p className="mt-2 text-sm">
                    Ø´Ù‡Ø¯Øª Ø§Ù„ÙƒÙ„ÙŠØ© ÙÙŠ ÙØªØ±Ø§Øª Ø³Ø§Ø¨Ù‚Ø© Ø¥Ø¶Ø±Ø§Ø¨Ø§Øª Ø·Ù„Ø§Ø¨ÙŠØ© ÙˆÙ…Ø·Ø§Ù„Ø¨ Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ© ÙˆØ¥Ø¯Ø§Ø±ÙŠØ©ØŒ Ø«Ù… ØªÙ… Ø§Ø³ØªØ¦Ù†Ø§Ù Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ø¨Ø¹Ø¯ Ø§ØªÙØ§Ù‚Ø§Øª
                    Ø¨ÙŠÙ† Ø§Ù„Ø·Ø§Ù‚Ù… Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ ÙˆÙ…Ù…Ø«Ù„ÙŠ Ø§Ù„Ø·Ù„Ø§Ø¨.
                  </p>
                </motion.article>
              )}
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="admin" className="mt-3 grid gap-3 md:grid-cols-2">
            <motion.article className="section-card" variants={cardIn} initial="hidden" animate="show">
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <School size={18} className="text-yellow-700 dark:text-yellow-300" />
                Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙƒÙ„ÙŠØ© ÙˆØ§Ù„ØªØ¹Ø§ÙˆÙ†
              </h2>
              <p className="mt-2 text-sm">Ø¹Ù…ÙŠØ¯ Ø§Ù„ÙƒÙ„ÙŠØ©: Ø§Ù„Ø£Ø³ØªØ§Ø° Ù…Ø­Ù…Ø¯ Ø¹Ø¨Ø¯ Ø§Ù„Ù„Ù‡ Ø¹Ø±ÙÙ‡.</p>
              <p className="mt-2 text-sm">
                ØªÙˆØ¬Ø¯ ØªØ¹Ø§ÙˆÙ†Ø§Øª Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ© Ù…Ø¹ Ù…Ø¤Ø³Ø³Ø§Øª Ø®Ø§Ø±Ø¬ÙŠØ©ØŒ Ù…Ù† Ø¨ÙŠÙ†Ù‡Ø§ ØªÙˆÙ‚ÙŠØ¹ Ø§ØªÙØ§Ù‚ÙŠØ§Øª Ù…Ø¹ Ù…Ø¹Ù‡Ø¯ Ø§Ù„Ø¯ÙˆØ­Ø© Ù„Ù„Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø¹Ù„ÙŠØ§.
              </p>
            </motion.article>

            <motion.article className="section-card" variants={cardIn} initial="hidden" animate="show">
              <h2 className="text-xl font-black">Ù…ØµØ¯Ø± Ø±Ø³Ù…ÙŠ Ù…Ø±ØªØ¨Ø· Ø¨Ø§Ù„ÙƒÙ„ÙŠØ©</h2>
              <a
                href="https://tinyurl.com/5fcndzzt"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-black text-slate-900 hover:bg-yellow-400"
              >
                Ù…ÙˆÙ‚Ø¹ Ø§Ù„ÙƒÙ„ÙŠØ© / Ù†ØªØ§Ø¦Ø¬ Ø§Ù„Ø§Ù…ØªØ­Ø§Ù†Ø§Øª ÙˆØ§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª
                <ExternalLink size={16} />
              </a>
            </motion.article>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

