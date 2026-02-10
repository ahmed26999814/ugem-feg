import { NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ctqqttielcknjpzbynbk.supabase.co";

const ADMIN_USER = process.env.ANNONCES_ADMIN_USER ?? "ugem feg";
const ADMIN_PASS = process.env.ANNONCES_ADMIN_PASS ?? "44881891";

const DEFAULT_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "annonces";

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

function buildSupabaseHeaders(key: string, contentType: string) {
  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": contentType,
    "x-upsert": "true",
  };
  if (!key.startsWith("sb_")) {
    headers.Authorization = `Bearer ${key}`;
  }
  return headers;
}

function sanitizeFileName(name: string) {
  return name.replace(/[^\w.\-]+/g, "_").slice(0, 80) || "image";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    if (!isValidAdmin(username, password)) {
      return NextResponse.json({ error: "بيانات الأدمن غير صحيحة" }, { status: 401 });
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "الصورة مطلوبة" }, { status: 400 });
    }

    const serviceKey = getServiceKey();
    if (!serviceKey) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY (أو SUPABASE_SECRET_KEY) غير مضبوط." },
        { status: 500 }
      );
    }

    const bucket = DEFAULT_BUCKET;
    const safeName = sanitizeFileName(file.name);
    const path = `site/home-${Date.now()}-${safeName}`;
    const arrayBuffer = await file.arrayBuffer();
    const contentType = file.type || "application/octet-stream";

    const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
      method: "POST",
      headers: buildSupabaseHeaders(serviceKey, contentType),
      body: Buffer.from(arrayBuffer),
    });

    if (!uploadRes.ok) {
      const text = await uploadRes.text();
      return NextResponse.json(
        { error: text || "فشل رفع الصورة. تأكد من وجود bucket وإعداده Public." },
        { status: 500 }
      );
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
