import { NextResponse } from "next/server";

type Payload = {
  username?: string;
  password?: string;
  title?: string;
  body?: string;
  source?: string;
  id?: string;
};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ctqqttielcknjpzbynbk.supabase.co";

const ADMIN_USER = process.env.ANNONCES_ADMIN_USER ?? "ugem feg";
const ADMIN_PASS = process.env.ANNONCES_ADMIN_PASS ?? "31682774";

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
  // New Supabase keys (sb_secret / sb_publishable) are API keys, not JWTs.
  if (!key.startsWith("sb_")) {
    headers.Authorization = `Bearer ${key}`;
  }
  if (withJson) headers["Content-Type"] = "application/json";
  return headers;
}

async function insertNotice(title: string, body: string, source: string, key: string) {
  let inferredType = "news";
  try {
    const probe = await fetch(
      `${SUPABASE_URL}/rest/v1/annonces?select=type&order=created_at.desc.nullslast&limit=1`,
      {
        headers: buildSupabaseHeaders(key),
        cache: "no-store",
      }
    );
    if (probe.ok) {
      const rows = (await probe.json()) as Array<{ type?: unknown }>;
      const t = rows?.[0]?.type;
      if (typeof t === "string" && t.trim()) inferredType = t.trim();
    }
  } catch {
    // Keep safe fallback when probe fails.
  }

  const content = source ? `${body}\n\nالمصدر: ${source}` : body;
  const payload = [{ title, content, type: inferredType, is_active: true, link: "" }];

  const res = await fetch(`${SUPABASE_URL}/rest/v1/annonces`, {
    method: "POST",
    headers: {
      ...buildSupabaseHeaders(key, true),
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false as const, error: text || "فشل إضافة الإعلان" };
  }

  const inserted = await res.json();
  return { ok: true as const, inserted };
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;
    const username = data.username ?? "";
    const password = data.password ?? "";
    const title = (data.title ?? "").trim();
    const body = (data.body ?? "").trim();
    const source = (data.source ?? "").trim() || "الإدارة/الاتحاد";

    if (!isValidAdmin(username, password)) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }

    if (!title || !body) {
      return NextResponse.json({ error: "العنوان والمحتوى مطلوبان" }, { status: 400 });
    }

    const serviceKey = getServiceKey();
    if (!serviceKey) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط. بدون هذا المفتاح سيظهر خطأ RLS." },
        { status: 500 }
      );
    }

    const insertedResult = await insertNotice(title, body, source, serviceKey);
    if (!insertedResult.ok) {
      return NextResponse.json({ error: insertedResult.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, inserted: insertedResult.inserted });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const data = (await req.json()) as Payload;
    const username = data.username ?? "";
    const password = data.password ?? "";
    const id = (data.id ?? "").trim();

    if (!isValidAdmin(username, password)) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "id مطلوب" }, { status: 400 });
    }

    const serviceKey = getServiceKey();
    if (!serviceKey) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط. بدون هذا المفتاح سيظهر خطأ RLS." },
        { status: 500 }
      );
    }

    const columns = ["id", "Primary", "primary", "uuid", "uid"];
    let deleted = false;
    let lastError = "فشل حذف الإعلان";

    for (const col of columns) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/annonces?${col}=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          ...buildSupabaseHeaders(serviceKey),
          Prefer: "return=representation",
        },
      });

      if (res.ok) {
        deleted = true;
        break;
      }

      const text = await res.text();
      lastError = text || lastError;
    }

    if (!deleted) {
      return NextResponse.json({ error: lastError }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
