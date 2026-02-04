export type Level = "L1" | "L2" | "L3";
export type Semester = "S1" | "S2";

export type SpecialiteCode = "FC" | "GRH" | "BA" | "EG";

export type Module = {
  name: string;
};

export type Specialite = {
  code: SpecialiteCode;
  label: string;
  level: "L1";
  semesters: Record<Semester, Module[]>;
  note?: string;
};

export const SPECIALITES: Specialite[] = [
  {
    code: "FC",
    label: "Finance et Comptabilite",
    level: "L1",
    semesters: {
      S1: [
        { name: "Principe de gestion" },
        { name: "Comptabilite financiere 1" },
        { name: "Mathematiques" },
        { name: "Statistiques descriptive 1" },
        { name: "Introduction au droit" },
        { name: "Introduction economie" },
      ],
      S2: [
        { name: "Comptabilite financiere 2" },
        { name: "Micro finance" },
        { name: "Economie d'entreprise" },
        { name: "Statistiques descriptive 2" },
        { name: "Micro economie" },
        { name: "Macro economie" },
      ],
    },
  },
  {
    code: "GRH",
    label: "Gestion des Ressources Humaines",
    level: "L1",
    semesters: {
      S1: [
        { name: "Principe de gestion" },
        { name: "Comptabilite financiere 1" },
        { name: "Mathematiques" },
        { name: "Statistiques descriptive 1" },
        { name: "Introduction au droit" },
        { name: "Introduction economie" },
      ],
      S2: [
        { name: "Gestion administrative RH" },
        { name: "Paie" },
        { name: "Gestion financiere 1" },
        { name: "Comptabilite financiere 2" },
        { name: "Droit du travail" },
      ],
    },
  },
  {
    code: "BA",
    label: "Banque et Assurance",
    level: "L1",
    semesters: {
      S1: [
        { name: "Principe de gestion" },
        { name: "Comptabilite financiere 1" },
        { name: "Mathematiques" },
        { name: "Statistiques descriptive 1" },
        { name: "Introduction au droit" },
        { name: "Introduction economie" },
      ],
      S2: [
        { name: "Comptabilite financiere 2" },
        { name: "Micro finance" },
        { name: "Economie d'entreprise" },
        { name: "Statistiques descriptive 2" },
      ],
    },
  },
  {
    code: "EG",
    label: "Economie et Gestion",
    level: "L1",
    semesters: { S1: [], S2: [] },
    note: "Modules a ajouter prochainement.",
  },
];

export type SpecialiteItem = { code: string; nameFR: string };

export const SPECIALITES_BY_LEVEL: Record<Level, SpecialiteItem[]> = {
  L1: SPECIALITES.map((item) => ({ code: item.code, nameFR: item.label })),
  L2: [
    { code: "FC", nameFR: "Finance et Comptabilite" },
    { code: "GRH", nameFR: "Gestion des Ressources Humaines" },
    { code: "BA", nameFR: "Banque et Assurance" },
    { code: "EG", nameFR: "Economie et Gestion" },
  ],
  L3: [
    { code: "FC", nameFR: "Finance et Comptabilite" },
    { code: "GRH", nameFR: "Gestion des Ressources Humaines" },
    { code: "BA", nameFR: "Banque et Assurance" },
    { code: "EG", nameFR: "Economie et Gestion" },
  ],
};
