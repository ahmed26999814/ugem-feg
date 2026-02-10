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
  return text.includes("show_counter") || text.includes("PGRST204");
}

async function getCount(key: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?select=visits&limit=1`, {
    headers: buildSupabaseHeaders(key),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "فشل تحميل عدد الزوار");
  }
  const rows = (await res.json()) as Array<{ visits?: number }>;
  return rows?.[0]?.visits ?? 0;
}

async function setCount(nextValue: number, key: string) {
  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/site_stats`, {
    method: "PATCH",
    headers: buildSupabaseHeaders(key, true),
    body: JSON.stringify({ visits: nextValue }),
  });
  if (patchRes.ok) return;

  const text = await patchRes.text();
  if (patchRes.status === 404) {
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/site_stats`, {
      method: "POST",
      headers: buildSupabaseHeaders(key, true),
      body: JSON.stringify([{ visits: nextValue }]),
    });
    if (!insertRes.ok) {
      const insertText = await insertRes.text();
      throw new Error(insertText || "فشل حفظ عدد الزوار");
    }
    return;
  }
  throw new Error(text || "فشل حفظ عدد الزوار");
}

async function getShowFlag(key: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?select=show_counter&limit=1`, {
    headers: buildSupabaseHeaders(key),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    if (isMissingColumn(text)) {
      return { show: true, missing: true };
    }
    throw new Error(text || "فشل تحميل حالة العداد");
  }
  const rows = (await res.json()) as Array<{ show_counter?: boolean }>;
  const show = typeof rows?.[0]?.show_counter === "boolean" ? rows[0].show_counter : true;
  return { show, missing: false };
}

async function setShowFlag(show: boolean, key: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats`, {
    method: "PATCH",
    headers: buildSupabaseHeaders(key, true),
    body: JSON.stringify({ show_counter: show }),
  });
  if (res.ok) return;

  const text = await res.text();
  if (isMissingColumn(text)) {
    throw new Error("أضف عمود show_counter (boolean) في جدول site_stats لتفعيل الإظهار/الإخفاء.");
  }
  throw new Error(text || "فشل حفظ حالة العداد");
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

    const count = await getCount(key);
    const showState = await getShowFlag(key);
    return NextResponse.json({ count, show: showState.show, missingShowColumn: showState.missing });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const key = getServiceKey();
    if (!key) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط." },
        { status: 500 }
      );
    }

    const current = await getCount(key);
    const showState = await getShowFlag(key);
    const nextValue = current + 1;
    await setCount(nextValue, key);

    return NextResponse.json({ count: nextValue, show: showState.show, missingShowColumn: showState.missing });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const data = (await req.json()) as { username?: string; password?: string; show?: boolean };
    const username = data.username ?? "";
    const password = data.password ?? "";

    if (!isValidAdmin(username, password)) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }

    if (typeof data.show !== "boolean") {
      return NextResponse.json({ error: "قيمة العرض غير صحيحة" }, { status: 400 });
    }

    const key = getServiceKey();
    if (!key) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط." },
        { status: 500 }
      );
    }

    const current = await getCount(key);
    await setShowFlag(Boolean(data.show), key);
    return NextResponse.json({ ok: true, show: Boolean(data.show), count: current });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
