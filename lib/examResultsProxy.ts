import { existsSync } from "node:fs";
import { ExamLookupResponse, ExamModule, ExamSubject, type ExamDecision, type ExamStudentSummary } from "@/lib/examResultsTypes";

const EXTERNAL_RESULTS_URL = "https://examen-feg.net/";
const CACHE_TTL_MS = 3 * 60 * 1000;

type CachedValue = { expiresAt: number; payload: ExamLookupResponse };
const lookupCache = new Map<string, CachedValue>();

type ScrapePayload = {
  pageText: string;
  rawBlock?: string;
};

function normalizeQuery(raw: string) {
  return raw.trim().toUpperCase();
}

function isNumericToken(value: string) {
  return /^\d+(?:\.\d+)?$/.test(value);
}

function toNumber(value: string | undefined) {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function normalizeDecision(value?: string): ExamDecision | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed === "Validé") return "Valide";
  if (trimmed === "Non Validé") return "Non Valide";
  return trimmed;
}

function splitCleanLines(text: string) {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function findValueBelowLabel(lines: string[], label: string) {
  const idx = lines.findIndex((line) => line === label);
  if (idx < 0) return undefined;
  return lines[idx + 1];
}

function parseSubjectLine(line: string): ExamSubject | null {
  const lineMatch = line.match(/^([A-Z]{2,}\d{4,})\s+(.+)$/u);
  if (!lineMatch) return null;

  const code = lineMatch[1];
  let rest = lineMatch[2].trim();
  let decision: ExamDecision | undefined;

  const decisionMatch = rest.match(/\s+(Non Validé|Validé|Rattrapage)$/u);
  if (decisionMatch) {
    decision = normalizeDecision(decisionMatch[1]);
    rest = rest.slice(0, decisionMatch.index).trim();
  }

  const tokens = rest.split(/\s+/);
  const numericTail: number[] = [];

  while (tokens.length && isNumericToken(tokens[tokens.length - 1])) {
    const token = tokens.pop();
    if (!token) break;
    numericTail.unshift(Number(token));
  }

  return {
    code,
    title: tokens.join(" ").trim(),
    metrics: numericTail,
    decision,
    rawLine: line,
  };
}

function parseExpandedBlock(rawBlock: string, lines: string[]) {
  const modules: ExamModule[] = [];
  const notes: string[] = [];

  const blockLines = splitCleanLines(rawBlock).filter((line) => line !== "Afficher le bloc complet");
  if (!blockLines.length) {
    return { modules, notes, summaryPatch: {} as Partial<ExamStudentSummary> };
  }

  const summaryPatch: Partial<ExamStudentSummary> = {};
  const headerLine = blockLines[0];
  const headerMatch = headerLine.match(/^([A-Z]\d+)\s+(.+?)\s+(\d+(?:\.\d+)?)\s+(Non Validé|Validé|Rattrapage)$/u);
  if (headerMatch) {
    summaryPatch.id = headerMatch[1];
    summaryPatch.name = headerMatch[2].trim();
    summaryPatch.average = Number(headerMatch[3]);
    summaryPatch.decision = normalizeDecision(headerMatch[4]);
  } else {
    notes.push("تعذر تحليل سطر الطالب الكامل، تم الاحتفاظ بالنص الخام.");
  }

  if (blockLines[1] && /^\d+$/.test(blockLines[1])) {
    summaryPatch.studentNumber = blockLines[1];
  }

  let currentModule: ExamModule | null = null;
  let lastSubject: ExamSubject | null = null;

  for (const line of blockLines.slice(2)) {
    if (/^\d+$/.test(line) && lastSubject) {
      lastSubject.rank = Number(line);
      continue;
    }

    const moduleMatch = line.match(/^([A-Z]{2,}\d{3})\s+(\d+(?:\.\d+)?)\s+(.+)$/u);
    if (moduleMatch) {
      currentModule = {
        code: moduleMatch[1],
        average: Number(moduleMatch[2]),
        decision: normalizeDecision(moduleMatch[3]),
        subjects: [],
        rawLine: line,
      };
      modules.push(currentModule);
      lastSubject = null;
      continue;
    }

    const subject = parseSubjectLine(line);
    if (subject) {
      if (!currentModule) {
        currentModule = {
          code: subject.code.slice(0, -1),
          subjects: [],
          rawLine: "(generated)",
        };
        modules.push(currentModule);
      }
      currentModule.subjects.push(subject);
      lastSubject = subject;
      continue;
    }

    notes.push(`سطر غير مُصنف: ${line}`);
  }

  if (!modules.length && lines.some((line) => line.includes("résultat(s)"))) {
    notes.push("تم إيجاد نتيجة، لكن تنسيق البلوك الكامل لم يُحلّل إلى وحدات.");
  }

  return { modules, notes, summaryPatch };
}

function parsePageText(query: string, pageText: string, rawBlock?: string): ExamLookupResponse {
  const lines = splitCleanLines(pageText);
  const resultCountMatch = pageText.match(/(\d+)\s+résultat\(s\)\./i);
  const resultCount = resultCountMatch ? Number(resultCountMatch[1]) : undefined;
  const found = typeof resultCount === "number" ? resultCount > 0 : !/Tape un ID/i.test(pageText);

  const summary: ExamStudentSummary = {
    resultCount,
    id: findValueBelowLabel(lines, "ID"),
    studentNumber: findValueBelowLabel(lines, "Numéro"),
    average: toNumber(findValueBelowLabel(lines, "Moyenne")),
    decision: normalizeDecision(findValueBelowLabel(lines, "Décision")),
  };

  const headlineLine = lines.find((line) => line.startsWith(query) && line.includes("—"));
  if (headlineLine) {
    const match = headlineLine.match(/^([A-Z]\d+)\s+—\s+([A-Z]{2,}\d{3})\s+(\d+(?:\.\d+)?)\s+(.+)$/u);
    if (match) {
      summary.id ??= match[1];
      summary.headlineModule = match[2];
      summary.headlineAverage = Number(match[3]);
      summary.headlineDecision = normalizeDecision(match[4]);
    }
  }

  const notes: string[] = [];
  let modules: ExamModule[] = [];

  if (rawBlock) {
    const parsed = parseExpandedBlock(rawBlock, lines);
    modules = parsed.modules;
    notes.push(...parsed.notes);
    Object.assign(summary, parsed.summaryPatch);
  }

  return {
    ok: true,
    found,
    query,
    fetchedAt: new Date().toISOString(),
    sourceSite: EXTERNAL_RESULTS_URL,
    summary,
    modules,
    rawBlock,
    pageText,
    notes,
  };
}

async function launchBrowser() {
  const { chromium } = await import("playwright");

  const edgePaths = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];

  const explicitPath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  const candidatePath = explicitPath || edgePaths.find((path) => existsSync(path));

  if (candidatePath) {
    return chromium.launch({ headless: true, executablePath: candidatePath });
  }

  try {
    return await chromium.launch({ headless: true, channel: "msedge" });
  } catch {
    return chromium.launch({ headless: true });
  }
}

async function scrapeExternalResults(query: string): Promise<ScrapePayload> {
  const browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  try {
    await page.goto(EXTERNAL_RESULTS_URL, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForTimeout(3_500);

    const input = page.locator("input").first();
    await input.waitFor({ timeout: 30_000 });
    await input.fill(query);
    await input.press("Enter");

    await page.waitForTimeout(7_000);

    const expandButton = page.getByText("Afficher le bloc complet").first();
    let rawBlock: string | undefined;
    if (await expandButton.isVisible().catch(() => false)) {
      await expandButton.click();
      await page.waitForTimeout(2_500);

      const bodyAfterExpand = await page.locator("body").innerText();
      const marker = "Afficher le bloc complet";
      const markerIndex = bodyAfterExpand.indexOf(marker);
      if (markerIndex >= 0) {
        rawBlock = bodyAfterExpand.slice(markerIndex).trim();
      }
    }

    const pageText = (await page.locator("body").innerText()).trim();
    return { pageText, rawBlock };
  } finally {
    await page.close().catch(() => undefined);
    await browser.close().catch(() => undefined);
  }
}

export async function lookupExamResult(queryInput: string): Promise<ExamLookupResponse> {
  const query = normalizeQuery(queryInput);
  const cached = lookupCache.get(query);
  if (cached && cached.expiresAt > Date.now()) {
    return { ...cached.payload, notes: [...cached.payload.notes, "تم استخدام نسخة مخزنة مؤقتًا."] };
  }

  const scrape = await scrapeExternalResults(query);
  const payload = parsePageText(query, scrape.pageText, scrape.rawBlock);

  lookupCache.set(query, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    payload,
  });

  return payload;
}

