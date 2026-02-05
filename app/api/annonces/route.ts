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
const SUPABASE_ANON_FALLBACK =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_a9vgnTKPnx9SK1u8wKHoTw_37glO0q3";

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
    process.env.SUPABASE_SERVICE_ROLE ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    SUPABASE_ANON_FALLBACK
  );
}

async function insertNotice(title: string, body: string, source: string, key: string) {
  const content = source ? `${body}\n\nالمصدر: ${source}` : body;
  const payload = [{ title, content }];

  const res = await fetch(`${SUPABASE_URL}/rest/v1/annonces`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
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
        { error: "Supabase key غير مضبوط في متغيرات البيئة" },
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
        { error: "Supabase key غير مضبوط في متغيرات البيئة" },
        { status: 500 }
      );
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/annonces?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=representation",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text || "فشل حذف الإعلان" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
