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
    if (!serviceKey || serviceKey.startsWith("sb_publishable_")) {
      return NextResponse.json(
        { error: "Service role key غير مضبوط (SUPABASE_SERVICE_ROLE_KEY)" },
        { status: 500 }
      );
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/annonces`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify([{ title, body, source }]),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text || "فشل إضافة الإعلان" }, { status: 500 });
    }

    const inserted = await res.json();
    return NextResponse.json({ ok: true, inserted });
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
    if (!serviceKey || serviceKey.startsWith("sb_publishable_")) {
      return NextResponse.json(
        { error: "Service role key غير مضبوط (SUPABASE_SERVICE_ROLE_KEY)" },
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
