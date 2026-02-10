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

async function getRow(key: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?id=eq.1&select=id,visits,show_counter`, {
    headers: buildSupabaseHeaders(key),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "فشل تحميل عدد الزوار");
  }
  const rows = (await res.json()) as Array<{ id: number; visits?: number; show_counter?: boolean }>;
  if (!rows.length) return null;
  return {
    visits: rows[0].visits ?? 0,
    show: typeof rows[0].show_counter === "boolean" ? rows[0].show_counter : true,
  };
}

async function upsertRow(nextValue: number, show: boolean, key: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?select=visits`, {
    method: "POST",
    headers: {
      ...buildSupabaseHeaders(key, true),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([{ id: 1, visits: nextValue, show_counter: show }]),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "فشل حفظ عدد الزوار");
  }

  const rows = (await res.json()) as Array<{ visits: number; show_counter?: boolean }>;
  return {
    visits: rows?.[0]?.visits ?? nextValue,
    show: typeof rows?.[0]?.show_counter === "boolean" ? rows[0].show_counter : show,
  };
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

    const row = await getRow(key);
    return NextResponse.json({ count: row?.visits ?? 0, show: row?.show ?? true });
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

    const row = await getRow(key);
    const current = row?.visits ?? 0;
    const show = row?.show ?? true;
    const nextValue = current + 1;
    const saved = await upsertRow(nextValue, show, key);

    return NextResponse.json({ count: saved.visits, show: saved.show });
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

    const row = await getRow(key);
    const current = row?.visits ?? 0;
    const saved = await upsertRow(current, data.show, key);

    return NextResponse.json({ ok: true, show: saved.show, count: saved.visits });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
