import { NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ctqqttielcknjpzbynbk.supabase.co";

const ADMIN_USER = process.env.ANNONCES_ADMIN_USER ?? "ugem feg";
const ADMIN_PASS = process.env.ANNONCES_ADMIN_PASS ?? "44881891";

function isValidAdmin(username: string, password: string) {
  return username.trim().toLowerCase() === ADMIN_USER.toLowerCase() && password.trim() === ADMIN_PASS;
}

function getServiceKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE
  );
}

function buildSupabaseHeaders(key: string, withJson = false) {
  const headers: Record<string, string> = { apikey: key };
  if (!key.startsWith("sb_")) {
    headers.Authorization = `Bearer ${key}`;
  }
  if (withJson) headers["Content-Type"] = "application/json";
  return headers;
}

function isMissingColumn(text: string, column: string) {
  return text.includes(column) || text.includes("PGRST204");
}

function parseUrls(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string" && v.trim()) as string[];
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((v) => typeof v === "string" && v.trim()) as string[];
      }
    } catch {
      // keep string fallback
    }
    return [trimmed];
  }
  return [];
}

export async function GET() {
  try {
    const key = getServiceKey();
    if (!key) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط." },
        { status: 500 }
      );
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?select=home_collage_urls&limit=1`, {
      headers: buildSupabaseHeaders(key),
      cache: "no-store",
    });

    if (res.ok) {
      const rows = (await res.json()) as Array<{ home_collage_urls?: string }>;
      const urls = parseUrls(rows?.[0]?.home_collage_urls);
      return NextResponse.json({ urls });
    }

    const text = await res.text();
    if (isMissingColumn(text, "home_collage_urls")) {
      const fallbackRes = await fetch(
        `${SUPABASE_URL}/rest/v1/site_stats?select=home_collage_url&limit=1`,
        { headers: buildSupabaseHeaders(key), cache: "no-store" }
      );
      if (!fallbackRes.ok) {
        const fallbackText = await fallbackRes.text();
        if (isMissingColumn(fallbackText, "home_collage_url")) {
          return NextResponse.json({ urls: [], missingColumn: true });
        }
        return NextResponse.json({ error: fallbackText || "فشل تحميل صور الصفحة الرئيسية" }, { status: 500 });
      }
      const rows = (await fallbackRes.json()) as Array<{ home_collage_url?: string }>;
      const urls = parseUrls(rows?.[0]?.home_collage_url);
      return NextResponse.json({ urls, missingColumn: true });
    }

    return NextResponse.json({ error: text || "فشل تحميل صور الصفحة الرئيسية" }, { status: 500 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const data = (await req.json()) as { username?: string; password?: string; url?: string; urls?: string[] };
    const username = data.username ?? "";
    const password = data.password ?? "";
    const urls = Array.isArray(data.urls) ? data.urls.filter(Boolean) : [];
    const fallbackUrl = typeof data.url === "string" ? data.url.trim() : "";
    const finalUrls = urls.length ? urls : fallbackUrl ? [fallbackUrl] : [];

    if (!isValidAdmin(username, password)) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }
    if (!finalUrls.length) {
      return NextResponse.json({ error: "روابط الصور مطلوبة" }, { status: 400 });
    }

    const key = getServiceKey();
    if (!key) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط." },
        { status: 500 }
      );
    }

    const payload = { home_collage_urls: JSON.stringify(finalUrls) };
    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?visits=gte.0`, {
      method: "PATCH",
      headers: buildSupabaseHeaders(key, true),
      body: JSON.stringify(payload),
    });

    if (!patchRes.ok) {
      const text = await patchRes.text();
      if (isMissingColumn(text, "home_collage_urls")) {
        return NextResponse.json(
          { error: "أضف عمود home_collage_urls (text) داخل جدول site_stats لتفعيل الصور المتعددة." },
          { status: 400 }
        );
      }

      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/site_stats`, {
        method: "POST",
        headers: buildSupabaseHeaders(key, true),
        body: JSON.stringify([{ visits: 0, home_collage_urls: JSON.stringify(finalUrls) }]),
      });
      if (!insertRes.ok) {
        const insertText = await insertRes.text();
        return NextResponse.json({ error: insertText || "فشل حفظ الصور" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, urls: finalUrls });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
