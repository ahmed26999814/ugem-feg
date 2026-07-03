import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/adminAuth";
import { getSupabaseServiceKey, getSupabaseUrl } from "@/lib/supabaseEnv";

type Payload = {
  title?: string;
  body?: string;
  source?: string;
  imageUrl?: string;
  id?: string;
};

function getServiceKey() {
  return getSupabaseServiceKey();
}

function buildSupabaseHeaders(key: string, withJson = false) {
  const headers: Record<string, string> = { apikey: key };
  if (!key.startsWith("sb_")) {
    headers.Authorization = `Bearer ${key}`;
  }
  if (withJson) headers["Content-Type"] = "application/json";
  return headers;
}

async function insertNotice(title: string, body: string, source: string, imageUrl: string, key: string) {
  let inferredType = "news";
  try {
    const probe = await fetch(
      `${getSupabaseUrl()}/rest/v1/annonces?select=type&order=created_at.desc.nullslast&limit=1`,
      {
        headers: buildSupabaseHeaders(key),
        cache: "no-store",
      }
    );
    if (probe.ok) {
      const rows = (await probe.json()) as Array<{ type?: unknown }>;
      const type = rows?.[0]?.type;
      if (typeof type === "string" && type.trim()) inferredType = type.trim();
    }
  } catch {
    // Keep fallback when the probe fails.
  }

  const content = body
    ? source
      ? `${body}\n\nالمصدر: ${source}`
      : body
    : source
      ? `المصدر: ${source}`
      : "";
  const payload = [{ title, content, type: inferredType, is_active: true, link: imageUrl || "" }];

  const res = await fetch(`${getSupabaseUrl()}/rest/v1/annonces`, {
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
    if (!(await hasAdminSession())) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }

    const data = (await req.json()) as Payload;
    const title = (data.title ?? "").trim();
    const body = (data.body ?? "").trim();
    const source = (data.source ?? "").trim() || "الإدارة/الاتحاد";
    const imageUrl = (data.imageUrl ?? "").trim();

    if (!title || (!body && !imageUrl)) {
      return NextResponse.json({ error: "العنوان والمحتوى أو صورة الإعلان مطلوبان" }, { status: 400 });
    }

    const serviceKey = getServiceKey();
    if (!serviceKey) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY أو SUPABASE_SECRET_KEY غير مضبوط. بدون هذا المفتاح سيظهر خطأ RLS." },
        { status: 500 }
      );
    }

    const insertedResult = await insertNotice(title, body, source, imageUrl, serviceKey);
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
    if (!(await hasAdminSession())) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }

    const data = (await req.json()) as Payload;
    const id = (data.id ?? "").trim();

    if (!id) {
      return NextResponse.json({ error: "id مطلوب" }, { status: 400 });
    }

    const serviceKey = getServiceKey();
    if (!serviceKey) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY أو SUPABASE_SECRET_KEY غير مضبوط. بدون هذا المفتاح سيظهر خطأ RLS." },
        { status: 500 }
      );
    }

    const columns = ["id", "Primary", "primary", "uuid", "uid"];
    let deleted = false;
    let lastError = "فشل حذف الإعلان";

    for (const col of columns) {
      const res = await fetch(`${getSupabaseUrl()}/rest/v1/annonces?${col}=eq.${encodeURIComponent(id)}`, {
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
