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
  "Ø§Ù„Ø¯ÙØ§Ø¹ Ø¹Ù† Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ© ÙˆØ§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ© Ù„Ù„Ø·Ù„Ø§Ø¨",
  "Ù†Ù‚Ù„ Ù…Ø·Ø§Ù„Ø¨ ÙˆØ§Ù†Ø´ØºØ§Ù„Ø§Øª Ø§Ù„Ø·Ù„Ø§Ø¨ Ø¥Ù„Ù‰ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙƒÙ„ÙŠØ©",
  "ØªÙˆØ¶ÙŠØ­ Ø§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ© ÙˆØ§Ù„Ø¨Ù„Ø§ØºØ§Øª Ø§Ù„Ø±Ø³Ù…ÙŠØ©",
  "Ù…Ø±Ø§ÙÙ‚Ø© Ø§Ù„Ø·Ù„Ø§Ø¨ ÙÙŠ Ø§Ù„Ù‚Ø¶Ø§ÙŠØ§ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ© (Ø§Ù„ØªØ³Ø¬ÙŠÙ„ØŒ Ø§Ù„Ø§Ù…ØªØ­Ø§Ù†Ø§ØªØŒ Ø§Ù„ØªÙˆØ¬ÙŠÙ‡)",
  "ØªØ£Ø·ÙŠØ± ÙˆØªÙˆØ¬ÙŠÙ‡ Ø§Ù„Ø·Ù„Ø§Ø¨ Ø§Ù„Ø¬Ø¯Ø¯ (Ø®ØµÙˆØµÙ‹Ø§ Ø·Ù„Ø¨Ø© Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰ L1)",
  "Ø§Ù„Ù…Ø³Ø§Ù‡Ù…Ø© ÙÙŠ ØªØ­Ø³ÙŠÙ† Ø¸Ø±ÙˆÙ Ø§Ù„Ø¯Ø±Ø§Ø³Ø© ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ©",
  "Ù…Ø­Ø§Ø±Ø¨Ø© Ø§Ù„Ø¥Ø´Ø§Ø¹Ø§Øª ÙˆÙ†Ø´Ø± Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø© Ø§Ù„ØµØ­ÙŠØ­Ø©",
  "ØªØ¹Ø²ÙŠØ² Ø±ÙˆØ­ Ø§Ù„ØªØ¶Ø§Ù…Ù† ÙˆØ§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø·Ù„Ø§Ø¨ÙŠ",
];

const leadership = [
  "Ù…Ø­Ù…Ø¯ Ø§Ù„Ù…Ø®ØªØ§Ø± Ø§Ù†Ø¬ÙŠÙ‡ â€” Ø±Ø¦ÙŠØ³ Ø§Ù„Ù‚Ø³Ù…",
  "Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ… Ø¹Ø¨Ø¯ÙˆÙ„Ø§ Ø¨Ø§ â€” Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø§Ù„Ø£ÙˆÙ„",
  "Ù…Ø­Ù…Ø¯ Ø¹Ø¨Ø¯Ø§Ù„Ù„Ù‡ Ù„Ø­Ø¨ÙˆØ³ â€” Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø§Ù„Ø«Ø§Ù†ÙŠ",
];

const office = [
  "Ø§Ù„Ù…ØµØ·ÙÙ‰ Ø¹Ø¨Ø¯Ø§Ù„Ù„Ù‡ Ù…Ø§Ø¯ÙŠ â€” Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù…",
  "Ù…Ù†Ù‰ Ù…Ø­Ù…Ø¯ ÙŠØ³Ù„Ù… â€” Ù…Ø³Ø¤ÙˆÙ„Ø© Ø§Ù„Ø§Ù†ØªØ³Ø§Ø¨ ÙˆØ§Ù„ØªØ¹Ø¨Ø¦Ø© ÙˆØ§Ù„ØªØ­Ø³ÙŠØ³",
  "ÙØ§Ø·Ù…Ø© Ø¯ÙŠØ§ â€” Ù…Ø³Ø¤ÙˆÙ„Ø© Ø§Ù„Ø§Ù†ØªØ³Ø§Ø¨",
  "Ù…Ø­Ù…Ø¯ Ø´ØºÙ ÙŠØ§ÙŠÙŠÙ†Ù‡ (Ø§Ù„Ø¹ÙˆÙŠØ¶) â€” Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø«Ù‚Ø§ÙØ© ÙˆØ§Ù„Ø±ÙŠØ§Ø¶Ø©",
  "Ø¨Ù†ÙŠØªÙ‡ Ø¹Ø¨Ø¯ Ø§Ù„Ø¯Ø§ÙŠÙ… â€” Ù…Ø³Ø¤ÙˆÙ„Ø© Ø§Ù„Ù†Ø³Ø§Ø¡",
  "Ø²ÙŠÙ†Ø© Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ… Ù„ÙŠ â€” Ù…Ø³Ø¤ÙˆÙ„Ø© Ø§Ù„Ø¹Ù„Ø§Ù‚Ø§Øª Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠØ©",
  "Ø£Ø­Ù…Ø¯ Ù„Ø­Ø¨ÙŠØ¨ â€” Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø´Ø¤ÙˆÙ† Ø§Ù„Ø·Ù„Ø§Ø¨ÙŠØ©",
  "Ù…Ø­Ù…Ø¯ Ø¹Ø§Ù„ÙŠ Ø³ÙŠØ¯ÙŠ Ø£Ø­Ù…Ø¯ â€” Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø·Ù„Ø¨Ø© Ø§Ù„Ø£Ø¬Ø§Ù†Ø¨",
  "Ø£Ø­Ù…Ø¯ ÙŠØ§Ø¨Ù‡ Ø³Ø§Ù„Ù… â€” Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„ØªÙ†Ø¸ÙŠÙ…",
  "Ø£Ø³Ù…Ø§Ø¡ Ù…Ø­Ù…Ø¯ â€” Ù…Ø³Ø¤ÙˆÙ„Ø© Ø§Ù„Ù…Ø§Ù„ÙŠØ©",
];

const deputies = [
  "Ù…Ø§ÙƒÙ‡ Ø§Ù„Ù…Ø®ØªØ§Ø± Ø§Ù„ØªÙ„Ù…ÙŠØ¯ÙŠ â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù…",
  "Ø§Ù…ØºÙŠÙ„ÙŠ Ø§Ù„Ù‚Ø·Ø¨ â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø§Ù†ØªØ³Ø§Ø¨",
  "Ù…Ø­Ù…Ø¯ Ù„Ù…ÙŠÙ† Ø³ÙŠØ¯ÙŠ Ø§Ù„Ù‡Ø§Ø¯ÙŠ â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„ØªÙ†Ø¸ÙŠÙ…",
  "Ø§Ù„Ø³Ø§Ù„ÙƒØ© ÙØ§Ù„ Ø§Ø¬ÙˆØ§Ù„ÙŠ â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„ØªØ¹Ø¨Ø¦Ø© ÙˆØ§Ù„ØªØ­Ø³ÙŠØ³",
  "ÙØ§Ø·Ù…Ø© Ø§Ù„Ø«Ø§Ø¨Øª (ÙØ§Ù‡) â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„Ø© Ø§Ù„Ù†Ø³Ø§Ø¡",
  "Ø§Ù„Ù†Ø§Ù‡ Ø§Ù„Ø¯Ø§Ù‡ Ø§Ø³ÙˆÙŠØ¯ÙŠ â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„Ø© Ø§Ù„Ø¹Ù„Ø§Ù‚Ø§Øª Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠØ©",
  "Ø£Ø­Ù…Ø¯ Ø³Ø§Ù„Ùƒ Ø¨Ù†Ø§Ù‡ÙŠ â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø´Ø¤ÙˆÙ† Ø§Ù„Ø·Ù„Ø§Ø¨ÙŠØ©",
  "Ø²ÙŠØ¯Ø§Ù† Ù…ÙˆÙ„ÙˆØ¯ â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø«Ù‚Ø§ÙØ© ÙˆØ§Ù„Ø±ÙŠØ§Ø¶Ø©",
  "Ø­ÙØµØ© Ø£Ù†Ø³Ø§Ù†ÙŠ Ø¯ÙŠÙˆØ¨ â€” Ù†Ø§Ø¦Ø¨ Ù…Ø³Ø¤ÙˆÙ„Ø© Ø§Ù„Ù…Ø§Ù„ÙŠØ©",
];

type TeamView = "leaders" | "officials" | "deputies";
type TeamMember = { role: string; name: string };

function toMember(item: string, fallbackRole: string): TeamMember {
  const parts = item.split("â€”").map((p) => p.trim());
  return { name: parts[0] ?? item, role: parts[1] ?? fallbackRole };
}

export default function UgemPage() {
  const [teamView, setTeamView] = useState<TeamView | null>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const teamMembersMap = useMemo<Record<TeamView, TeamMember[]>>(
    () => ({
      leaders: leadership.map((i) => toMember(i, "Ø§Ù„Ù‚ÙŠØ§Ø¯Ø©")),
      officials: office.map((i) => toMember(i, "Ù…Ø³Ø¤ÙˆÙ„")),
      deputies: deputies.map((i) => toMember(i, "Ù†Ø§Ø¦Ø¨")),
    }),
    []
  );

  const teamTitleMap: Record<TeamView, string> = {
    leaders: "Ø§Ù„Ù‚ÙŠØ§Ø¯Ø©",
    officials: "Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙˆÙ†",
    deputies: "Ø§Ù„Ù†ÙˆØ§Ø¨",
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
              <h1 className="text-2xl font-black md:text-4xl">Ø§Ù„Ø§ØªØ­Ø§Ø¯ Ø§Ù„Ø¹Ø§Ù… Ù„Ù„Ø·Ù„Ø§Ø¨ Ø§Ù„Ù…ÙˆØ±ÙŠØªØ§Ù†ÙŠÙŠÙ†</h1>
              <p className="mt-1 text-sm font-bold text-yellow-700 dark:text-yellow-300">
                ÙƒÙ„ÙŠØ© Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ ÙˆØ§Ù„ØªØ³ÙŠÙŠØ± â€“ Ø¬Ø§Ù…Ø¹Ø© Ù†ÙˆØ§ÙƒØ´ÙˆØ· Ø§Ù„Ø¹ØµØ±ÙŠØ© | UGEM â€“ FEG
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
              Ø§Ù„Ø¬Ù‡Ø© ÙˆØ§Ù„Ù†Ø¨Ø°Ø©
            </Tabs.Trigger>
            <Tabs.Trigger value="mission" className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100">
              Ø§Ù„Ø±Ø³Ø§Ù„Ø© ÙˆØ§Ù„Ù…Ù‡Ø§Ù…
            </Tabs.Trigger>
            <Tabs.Trigger value="team" className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100">
              Ø§Ù„Ù…ÙƒØªØ¨
            </Tabs.Trigger>
            <Tabs.Trigger value="contact" className="shrink-0 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 data-[state=active]:border-yellow-400 data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800 dark:data-[state=active]:border-yellow-400/60 dark:data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:text-yellow-100">
              Ø§Ù„ØªÙˆØ§ØµÙ„
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="about" className="mt-3 grid gap-3">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3">
              <motion.article className="section-card" variants={cardIn}>
                <h2 className="inline-flex items-center gap-2 text-xl font-black">
                  <BadgeCheck size={18} className="text-yellow-700 dark:text-yellow-300" />
                  Ø§Ù„Ø¬Ù‡Ø©
                </h2>
                <p className="mt-2 text-sm">
                  Ù‚Ø³Ù… ØªØ§Ø¨Ø¹ Ù„Ù€ Ø§Ù„Ø§ØªØ­Ø§Ø¯ Ø§Ù„Ø¹Ø§Ù… Ù„Ù„Ø·Ù„Ø§Ø¨ Ø§Ù„Ù…ÙˆØ±ÙŠØªØ§Ù†ÙŠÙŠÙ† (UGEM)ØŒ ÙˆÙ‡Ùˆ Ù†Ù‚Ø§Ø¨Ø© Ø·Ù„Ø§Ø¨ÙŠØ© ÙˆØ·Ù†ÙŠØ© Ù…Ø±Ø®Ù‘ØµØ©ØŒ ØªÙØ¹Ø¯ Ø§Ù„Ø¥Ø·Ø§Ø±
                  Ø§Ù„Ø´Ø±Ø¹ÙŠ Ø§Ù„Ù…Ù…Ø«Ù„ Ù„Ø·Ù„Ø§Ø¨ Ø§Ù„ØªØ¹Ù„ÙŠÙ… Ø§Ù„Ø¹Ø§Ù„ÙŠ ÙÙŠ Ù…ÙˆØ±ÙŠØªØ§Ù†ÙŠØ§.
                </p>
              </motion.article>

              <motion.article className="section-card" variants={cardIn}>
                <h2 className="inline-flex items-center gap-2 text-xl font-black">
                  <Users2 size={18} className="text-yellow-700 dark:text-yellow-300" />
                  Ù†Ø¨Ø°Ø© Ø¹Ù† Ø§Ù„Ø§ØªØ­Ø§Ø¯
                </h2>
                <p className="mt-2 text-sm">
                  ÙŠØ¹Ù…Ù„ Ù‚Ø³Ù… Ø§Ù„Ø§ØªØ­Ø§Ø¯ Ø§Ù„Ø¹Ø§Ù… Ù„Ù„Ø·Ù„Ø§Ø¨ Ø§Ù„Ù…ÙˆØ±ÙŠØªØ§Ù†ÙŠÙŠÙ† Ø¨ÙƒÙ„ÙŠØ© Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ ÙˆØ§Ù„ØªØ³ÙŠÙŠØ± Ø¹Ù„Ù‰ Ø§Ù„Ø¯ÙØ§Ø¹ Ø¹Ù† Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©
                  ÙˆØ§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ© Ù„Ù„Ø·Ù„Ø§Ø¨ØŒ ÙˆØªÙ…Ø«ÙŠÙ„Ù‡Ù… ØªÙ…Ø«ÙŠÙ„Ù‹Ø§ Ù…Ø³Ø¤ÙˆÙ„Ù‹Ø§ Ø£Ù…Ø§Ù… Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙƒÙ„ÙŠØ©ØŒ ÙˆØ§Ù„Ù…Ø³Ø§Ù‡Ù…Ø© ÙÙŠ ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø¸Ø±ÙˆÙ Ø§Ù„Ø¯Ø±Ø§Ø³ÙŠØ©
                  ÙˆÙ†Ø´Ø± Ø§Ù„ÙˆØ¹ÙŠ Ø§Ù„Ø·Ù„Ø§Ø¨ÙŠ ÙÙŠ Ø¬Ùˆ Ù…Ù† Ø§Ù„Ø§Ù†Ø¶Ø¨Ø§Ø· ÙˆØ§Ù„Ø§Ø­ØªØ±Ø§Ù….
                </p>
              </motion.article>
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="mission" className="mt-3 grid gap-3">
            <motion.article className="section-card" variants={cardIn} initial="hidden" animate="show">
              <h2 className="inline-flex items-center gap-2 text-xl font-black">
                <Megaphone size={18} className="text-yellow-700 dark:text-yellow-300" />
                Ø±Ø³Ø§Ù„Ø© Ø§Ù„Ù‚Ø³Ù…
              </h2>
              <p className="mt-2 text-sm">
                ØªÙ…Ø«ÙŠÙ„ Ø§Ù„Ø·Ù„Ø§Ø¨ ØªÙ…Ø«ÙŠÙ„Ù‹Ø§ Ù…Ø³Ø¤ÙˆÙ„Ù‹Ø§ØŒ Ù†Ù‚Ù„ Ø§Ù†Ø´ØºØ§Ù„Ø§ØªÙ‡Ù… ÙˆÙ…Ø·Ø§Ù„Ø¨Ù‡Ù… Ø¨Ø´ÙƒÙ„ Ù…Ù†Ø¸Ù…ØŒ Ù†Ø´Ø± Ø§Ù„ÙˆØ¹ÙŠ Ø§Ù„Ø·Ù„Ø§Ø¨ÙŠØŒ ÙˆØ§Ù„Ù…Ø³Ø§Ù‡Ù…Ø© ÙÙŠ
                Ø§Ø³ØªÙ‚Ø±Ø§Ø± ÙˆØªØ­Ø³ÙŠÙ† Ø§Ù„Ø¹Ù…Ù„ÙŠØ© Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ø¯Ø§Ø®Ù„ Ø§Ù„ÙƒÙ„ÙŠØ©.
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
                <h2 className="text-xl font-black">ØªØ´ÙƒÙŠÙ„Ø© Ù…ÙƒØªØ¨ Ø§Ù„Ù‚Ø³Ù…</h2>
                <p className="ui-muted mt-2">Ø§Ø®ØªØ± Ø§Ù„ÙØ¦Ø© Ø«Ù… Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ù…Ù†ØµØ¨ Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø§Ø³Ù… Ø¨Ø·Ø±ÙŠÙ‚Ø© Ù…Ù†Ø¸Ù…Ø©.</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setTeamView((prev) => (prev === "leaders" ? null : "leaders"));
                      setSelectedMember(null);
                    }}
                    className={`ui-action border ${teamView === "leaders" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    Ø§Ù„Ù‚ÙŠØ§Ø¯Ø©
                  </button>
                  <button
                    onClick={() => {
                      setTeamView((prev) => (prev === "officials" ? null : "officials"));
                      setSelectedMember(null);
                    }}
                    className={`ui-action border ${teamView === "officials" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙˆÙ†
                  </button>
                  <button
                    onClick={() => {
                      setTeamView((prev) => (prev === "deputies" ? null : "deputies"));
                      setSelectedMember(null);
                    }}
                    className={`ui-action border ${teamView === "deputies" ? "border-yellow-400 bg-yellow-500 text-slate-900 dark:border-yellow-400/60 dark:bg-yellow-500/20 dark:text-yellow-100" : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-yellow-500/40 dark:hover:bg-slate-800"}`}
                  >
                    Ø§Ù„Ù†ÙˆØ§Ø¨
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
                  <p className="ui-muted mt-3">Ø§Ø®ØªØ± Ù…Ù†ØµØ¨Ù‹Ø§ Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø§Ø³Ù….</p>
                )}
              </motion.section>
            )}
          </Tabs.Content>

          <Tabs.Content value="contact" className="mt-3 grid gap-3 md:grid-cols-2">
            <motion.article className="section-card" variants={cardIn} initial="hidden" animate="show">
              <h2 className="text-xl font-black">ÙˆØ³Ø§Ø¦Ù„ Ø§Ù„ØªÙˆØ§ØµÙ„</h2>
              <div className="mt-3 grid gap-2">
                <a
                  href="https://www.facebook.com/UGEMFEG"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900"
                >
                  ØµÙØ­Ø© ÙÙŠØ³Ø¨ÙˆÙƒ Ø§Ù„Ø±Ø³Ù…ÙŠØ©
                  <Facebook size={16} />
                </a>
                <a
                  href="tel:+22231682774"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900"
                >
                  Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù…: +222 31 68 27 74
                  <Phone size={16} />
                </a>
                <a
                  href="tel:+22248539265"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900"
                >
                  Ø±Ø¦ÙŠØ³ Ø§Ù„Ù‚Ø³Ù…: +222 48 53 92 65
                  <Phone size={16} />
                </a>
                <a
                  href="/groupes"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-900"
                >
                  Ù…Ø¬Ù…ÙˆØ¹Ø§Øª ÙˆØ§ØªØ³Ø§Ø¨ Ø­Ø³Ø¨ Ø§Ù„ØªØ®ØµØµ ÙˆØ§Ù„Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¯Ø±Ø§Ø³ÙŠ
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
                ØªÙ†Ø¨ÙŠÙ‡ Ù…Ù‡Ù… Ù„Ù„Ø·Ù„Ø§Ø¨
              </h2>
              <p className="mt-2 text-sm font-bold text-red-700 dark:text-red-300">
                ÙƒÙ„ Ù…Ø§ ÙŠÙÙ†Ø´Ø± Ø¹Ù† Ù‚Ø³Ù… Ø§Ù„Ø§ØªØ­Ø§Ø¯ Ù…Ø¨Ù†ÙŠ Ø¹Ù„Ù‰ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ù…Ø¤ÙƒØ¯Ø© Ù…Ù† Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø£Ùˆ Ù…ØµØ§Ø¯Ø± Ø±Ø³Ù…ÙŠØ©.
              </p>
              <p className="mt-2 text-sm font-bold text-red-700 dark:text-red-300">
                ÙŠØ±Ø¬Ù‰ Ø¹Ø¯Ù… ØªØ¯Ø§ÙˆÙ„ Ø§Ù„Ø¥Ø´Ø§Ø¹Ø§ØªØŒ ÙˆØ§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ù…Ù…Ø«Ù„ÙŠ Ø§Ù„Ø§ØªØ­Ø§Ø¯ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¹Ù†Ø¯ Ø£ÙŠ Ø§Ø³ØªÙØ³Ø§Ø±.
              </p>
              <p className="mt-3 text-sm">
                Ø§Ù„Ø§ØªØ­Ø§Ø¯ Ø§Ù„Ø¹Ø§Ù… Ù„Ù„Ø·Ù„Ø§Ø¨ Ø§Ù„Ù…ÙˆØ±ÙŠØªØ§Ù†ÙŠÙŠÙ† Ù‡Ùˆ ØµÙˆØª Ø§Ù„Ø·Ø§Ù„Ø¨ Ø¯Ø§Ø®Ù„ ÙƒÙ„ÙŠØ© Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ ÙˆØ§Ù„ØªØ³ÙŠÙŠØ±ØŒ ÙˆÙ‚ÙˆØªÙ‡ ÙÙŠ ÙˆØ¹ÙŠ Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ
                ØªÙ†Ø¸ÙŠÙ…Ù‡Ù…ØŒ ÙˆØªØ¹Ø§ÙˆÙ†Ù‡Ù….
              </p>
            </motion.article>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

