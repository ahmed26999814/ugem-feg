// lib/timetableFolders.ts

export type TimetableKind = "TD" | "Cours" | "Devoir" | "Examen";

export type SemesterEntry = {
  semester: "S1" | "S2" | "S3" | "S4" | "S5" | "S6";
  level: "L1" | "L2" | "L3";
  links: Record<TimetableKind, string>;
};

export const TIMETABLES: SemesterEntry[] = [
  // L1 - S1
  {
    level: "L1",
    semester: "S1",
    links: {
      TD: "https://drive.google.com/drive/folders/16YDtgyoJWqmU1zot7HFLE0Vlxu50wXei",
      Cours: "https://drive.google.com/drive/folders/1DT6RVor_8oRuQK3J2C7B7Dayoy6xy-O3",
      Devoir: "https://drive.google.com/drive/folders/1fQCQ7hqklcuMu0CvgmZDKUmFqZ47sLkC",
      Examen: "https://drive.google.com/drive/folders/16YDtgyoJWqmU1zot7HFLE0Vlxu50wXei",
    },
  },

  // L1 - S2
  {
    level: "L1",
    semester: "S2",
    links: {
      TD: "https://drive.google.com/drive/folders/1K59Aml6NkaXKJYL6LwCBIgXUv8ub9034",
      Cours: "https://drive.google.com/drive/folders/1Xz6DmoLWwHotuNivAPod-tgZNVP6SZ4s",
      Devoir: "https://drive.google.com/drive/folders/1wQPyjo9G0ruG3zv9kZbqlvvW6E__vU6M",
      Examen: "https://drive.google.com/drive/folders/1wxHwYxcAzjsVve2lw-Q6rP48Re4hGdgK",
    },
  },

  // L2 - S3
  {
    level: "L2",
    semester: "S3",
    links: {
      TD: "https://drive.google.com/drive/folders/1TTL7PXcKieOMHJNVoo_WHfYbcnHRwXEK",
      Cours: "https://drive.google.com/drive/folders/1vPWiTMHNLtP448DUNKl8DQONy-jgFML6",
      Devoir: "https://drive.google.com/drive/folders/1DQEo4xAvUUHpT1IjFgo_WMOz4NITeISN",
      Examen: "https://drive.google.com/drive/folders/1CP1PWojcHYZud5P-FY45WL1zpbAEYjNv",
    },
  },

  // L2 - S4
  {
    level: "L2",
    semester: "S4",
    links: {
      TD: "https://drive.google.com/drive/folders/1ixAQtqMYCYixOGVJX2PNu3MsUFzkTVu7",
      Cours: "https://drive.google.com/drive/folders/1mzaC3AhUF3U2LkiF3tf8lUkOmMtD2fMh",
      Devoir: "https://drive.google.com/drive/folders/1HsSdCWreMEiAbSM9Sz2mBUyMEO5SWZs8",
      Examen: "https://drive.google.com/drive/folders/19knl8Es_eRiKahJu_NFghnbzwKE2W0mD",
    },
  },

  // L3 - S5
  {
    level: "L3",
    semester: "S5",
    links: {
      TD: "https://drive.google.com/drive/folders/1D7Lt7mf_IOD30IFndImhSmunnUxC8ki7",
      Cours: "https://drive.google.com/drive/folders/160c_FIc7Jzi5bONdJgrYg4xQT44IEMY6",
      Devoir: "https://drive.google.com/drive/folders/1kannTNhntRRpzU-0pVn-sYlnbMeB5Iup",
      Examen: "https://drive.google.com/drive/folders/1112Nyp22xjlTphnvf8lBHf8RfsthAM-f",
    },
  },

  // L3 - S6
  {
    level: "L3",
    semester: "S6",
    links: {
      TD: "https://drive.google.com/drive/folders/12CCeoXrS43SUyH4Lt7B35o2LA9sM1CoP",
      Cours: "https://drive.google.com/drive/folders/1rS1TKC-tYzReXLxpVJq-5C1rsxF06FaF",
      Devoir: "https://drive.google.com/drive/folders/1KWrLI6LFHURJjB1_h9ck1jZpKD_Oad_v",
      Examen: "https://drive.google.com/drive/folders/1En8DOBvCJhOv0rxFbCEdfSppAr4v9Fv7",
    },
  },
];
