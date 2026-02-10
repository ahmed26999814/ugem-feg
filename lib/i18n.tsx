"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "ar" | "fr";

type Messages = Record<string, string>;

const AR: Messages = {
  "app.name": "UGEM - قسم كلية الاقتصاد والتسيير",
  "nav.home": "الرئيسية",
  "nav.annonces": "الإعلانات",
  "nav.archive": "الأرشيف",
  "nav.feg": "عن الكلية",
  "nav.ugem": "عن الاتحاد",
  "nav.groups": "المجموعات",
  "nav.specialites": "التخصصات",
  "nav.reviews": "المراجعات",
  "nav.results": "نتائج الامتحانات",
  "nav.lang": "اللغة",
  "nav.theme": "المظهر",
  "hero.title": "مرحباً بكم في الموقع الرسمي لقسم الاتحاد العام للطلاب الموريتانيين",
  "hero.search": "ابحث هنا... (الأرشيف، الإعلانات، التخصصات...)",
  "hero.fac": "كلية الاقتصاد والتسيير",
  "hero.desc": "منصة متكاملة وحديثة تساعد الطلبة على الوصول السريع إلى كل الأقسام الرسمية والمعلومات الموثوقة.",
  "splash.welcome": "مرحبا بكم",
  "splash.loading": "جاري التحميل...",
  "fab.results": "النتائج",
  "fab.dev": "المطور",
  "fab.top": "للأعلى",
  "footer.desc": "هذه منصة قسم كلية الاقتصاد والتسيير التابع للاتحاد العام للطلاب الموريتانيين.",
};

const FR: Messages = {
  "app.name": "UGEM - Section FEG",
  "nav.home": "Accueil",
  "nav.annonces": "Annonces",
  "nav.archive": "Archives",
  "nav.feg": "À propos de la faculté",
  "nav.ugem": "À propos de l'union",
  "nav.groups": "Groupes",
  "nav.specialites": "Spécialités",
  "nav.reviews": "Révisions",
  "nav.results": "Résultats",
  "nav.lang": "Langue",
  "nav.theme": "Thème",
  "hero.title": "Bienvenue sur le site officiel de la section UGEM",
  "hero.search": "Rechercher... (archives, annonces, spécialités...)",
  "hero.fac": "Faculté d'Économie et de Gestion",
  "hero.desc": "Une plateforme moderne qui aide les étudiants à accéder rapidement aux sections officielles et aux informations fiables.",
  "splash.welcome": "Bienvenue",
  "splash.loading": "Chargement...",
  "fab.results": "Résultats",
  "fab.dev": "Développeur",
  "fab.top": "Haut",
  "footer.desc": "Cette plateforme représente la section FEG de l'UGEM.",
};

const STORAGE_KEY = "ugem_lang";

type LangContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function t(lang: Lang, key: string) {
  const dict = lang === "fr" ? FR : AR;
  return dict[key] ?? key;
}

function detectLang(): Lang {
  if (typeof window === "undefined") return "ar";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "ar" || saved === "fr") return saved;
  return "ar";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === "ar" ? "fr" : "ar"));

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggleLang,
      t: (key: string) => t(lang, key),
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const LangProvider = I18nProvider;

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <I18nProvider />");
  return ctx;
}
