import { NextResponse } from "next/server";
import { lookupExamResult } from "@/lib/examResultsProxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function badRequest(message: string) {
  return NextResponse.json(
    {
      ok: false,
      found: false,
      error: message,
      modules: [],
      notes: [],
      sourceSite: "https://examen-feg.net/",
      fetchedAt: new Date().toISOString(),
      query: "",
    },
    { status: 400, headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (!q) return badRequest("يرجى إدخال رقم الطالب أو المعرّف (ID).");
  if (q.length > 32) return badRequest("قيمة البحث طويلة جدًا.");

  try {
    const data = await lookupExamResult(q);
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        ok: false,
        found: false,
        query: q.toUpperCase(),
        fetchedAt: new Date().toISOString(),
        sourceSite: "https://examen-feg.net/",
        modules: [],
        notes: [],
        error: message,
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
