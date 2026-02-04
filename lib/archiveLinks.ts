// lib/archiveLinks.ts

export type Level = "L1" | "L2" | "L3";

export type ArchiveItem = {
  code: "FC" | "GRH" | "BA" | "EG" | "GAP" | "GPT";
  label: string; // يظهر للمستخدم
  url: string;
  level: Level;
};

export const ARCHIVES: ArchiveItem[] = [
  // ===== L1 =====
  {
    level: "L1",
    code: "FC",
    label: "Finance & Comptabilité (FC)",
    url: "https://drive.google.com/drive/folders/1dpR5EaXY7CIjRGltqEhFKRiBbFkUtVfS",
  },
  {
    level: "L1",
    code: "GRH",
    label: "Gestion des Ressources Humaines (GRH)",
    url: "https://drive.google.com/drive/folders/1touioqtfB8eQSb_Lmq8dwG56af739zbg",
  },
  {
    level: "L1",
    code: "BA",
    label: "Banque & Assurance (BA)",
    url: "https://drive.google.com/drive/folders/1ktLMekBzGQgjEoCu9aboJJR83q9j4ucb",
  },
  {
    level: "L1",
    code: "EG",
    label: "Economie & Gestion (EG)",
    url: "https://drive.google.com/drive/folders/11Oo35o5Ge3MuLGKILJ0Ov8nOGDwkLywD",
  },

  // ===== L2 =====
  {
    level: "L2",
    code: "FC",
    label: "Finance & Comptabilité (FC)",
    url: "https://drive.google.com/drive/folders/1JsR-C0OuzgJXyIYjRZLJmyFaASILKHuV",
  },
  {
    level: "L2",
    code: "GRH",
    label: "Gestion des Ressources Humaines (GRH)",
    url: "https://drive.google.com/drive/folders/1yEtbk3DVewGujZPOOBWuYzj-hdJgYYfs",
  },
  {
    level: "L2",
    code: "BA",
    label: "Banque & Assurance (BA)",
    url: "https://drive.google.com/drive/folders/1eM-Lf1P3zE9XxNl9CbyObniwdWkpExbq",
  },
  {
    level: "L2",
    code: "EG",
    label: "Economie & Gestion (EG)",
    url: "https://drive.google.com/drive/folders/1spwttYTq-h_z2avGw5xodjvTl2P09eql",
  },

  // ===== L3 =====
  {
    level: "L3",
    code: "FC",
    label: "Finance & Comptabilité (FC)",
    url: "https://drive.google.com/drive/folders/1hBdYtu9irmJ5JR5UvYn2FsJ3bt2HLc6t",
  },
  {
    level: "L3",
    code: "GRH",
    label: "Gestion des Ressources Humaines (GRH)",
    url: "https://drive.google.com/drive/folders/1Lyd3bjzISH4qyEh2LWFfIpA1DWoKyOF8",
  },
  {
    level: "L3",
    code: "BA",
    label: "Banque & Assurance (BA)",
    url: "https://drive.google.com/drive/folders/1FcvEsreknuip8cR1juqnRMG-PjHVw_hK",
  },
  {
    level: "L3",
    code: "GAP",
    label: "Gestion Administratif Public (GAP)",
    url: "https://drive.google.com/drive/folders/1iPo_nrTuEe2bX0TCrYpfEbdPTtYTI8QE",
  },
  {
    level: "L3",
    code: "GPT",
    label: "Gestion Project Technique (GPT)",
    url: "https://drive.google.com/drive/folders/1quRKB59kro1v22vNmZF-pP5_tcQ0XEoV",
  },
];
