export type ExamDecision = "Valide" | "Non Valide" | "Rattrapage" | string;

export type ExamSubject = {
  code: string;
  title: string;
  metrics: number[];
  decision?: ExamDecision;
  rank?: number;
  rawLine: string;
};

export type ExamModule = {
  code: string;
  average?: number;
  decision?: ExamDecision;
  subjects: ExamSubject[];
  rawLine: string;
};

export type ExamStudentSummary = {
  id?: string;
  studentNumber?: string;
  name?: string;
  average?: number;
  decision?: ExamDecision;
  headlineModule?: string;
  headlineAverage?: number;
  headlineDecision?: ExamDecision;
  resultCount?: number;
};

export type ExamLookupResponse = {
  ok: boolean;
  found: boolean;
  query: string;
  fetchedAt: string;
  sourceSite: string;
  summary?: ExamStudentSummary;
  modules: ExamModule[];
  rawBlock?: string;
  pageText?: string;
  notes: string[];
  error?: string;
};

