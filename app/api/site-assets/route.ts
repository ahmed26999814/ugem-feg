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

function isMissingColumn(text: string) {
  return text.includes("home_collage_url") || text.includes("PGRST204");
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

    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?select=home_collage_url&limit=1`, {
      headers: buildSupabaseHeaders(key),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      if (isMissingColumn(text)) {
        return NextResponse.json({ url: null, missingColumn: true });
      }
      return NextResponse.json({ error: text || "فشل تحميل صورة الصفحة الرئيسية" }, { status: 500 });
    }

    const rows = (await res.json()) as Array<{ home_collage_url?: string }>;
    const url = rows?.[0]?.home_collage_url || null;
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const data = (await req.json()) as { username?: string; password?: string; url?: string };
    const username = data.username ?? "";
    const password = data.password ?? "";
    const url = (data.url ?? "").trim();

    if (!isValidAdmin(username, password)) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }
    if (!url) {
      return NextResponse.json({ error: "رابط الصورة مطلوب" }, { status: 400 });
    }

    const key = getServiceKey();
    if (!key) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط." },
        { status: 500 }
      );
    }

    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?visits=gte.0`, {
      method: "PATCH",
      headers: buildSupabaseHeaders(key, true),
      body: JSON.stringify({ home_collage_url: url }),
    });

    if (!patchRes.ok) {
      const text = await patchRes.text();
      if (isMissingColumn(text)) {
        return NextResponse.json(
          { error: "أضف عمود home_collage_url (text) داخل جدول site_stats لتفعيل الصورة." },
          { status: 400 }
        );
      }

      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/site_stats`, {
        method: "POST",
        headers: buildSupabaseHeaders(key, true),
        body: JSON.stringify([{ visits: 0, home_collage_url: url }]),
      });
      if (!insertRes.ok) {
        const insertText = await insertRes.text();
        return NextResponse.json({ error: insertText || "فشل حفظ الصورة" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
