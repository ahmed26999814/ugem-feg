import { NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ctqqttielcknjpzbynbk.supabase.co";

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

async function getCount(key: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?id=eq.1&select=id,visits`, {
    headers: buildSupabaseHeaders(key),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "فشل تحميل عدد الزوار");
  }
  const rows = (await res.json()) as Array<{ id: number; visits: number }>;
  if (!rows.length) return null;
  return rows[0].visits ?? 0;
}

async function upsertCount(nextValue: number, key: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_stats?select=visits`, {
    method: "POST",
    headers: {
      ...buildSupabaseHeaders(key, true),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([{ id: 1, visits: nextValue }]),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "فشل حفظ عدد الزوار");
  }

  const rows = (await res.json()) as Array<{ visits: number }>;
  return rows?.[0]?.visits ?? nextValue;
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
    return NextResponse.json({ count: count ?? 0 });
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
    const nextValue = (current ?? 0) + 1;
    const saved = await upsertCount(nextValue, key);

    return NextResponse.json({ count: saved });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
