import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminCookieOptions,
  createAdminSessionValue,
  hasAdminSession,
  isAdminConfigured,
  isValidAdminCredentials,
} from "@/lib/adminAuth";

export async function GET() {
  return NextResponse.json({ authed: await hasAdminSession() });
}

export async function POST(req: Request) {
  const data = (await req.json()) as { username?: string; password?: string };

  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "إعدادات الأدمن غير مضبوطة في متغيرات البيئة." }, { status: 500 });
  }

  if (!isValidAdminCredentials(data.username ?? "", data.password ?? "")) {
    return NextResponse.json({ error: "بيانات الأدمن غير صحيحة." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionValue(), adminCookieOptions());
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, "", { ...adminCookieOptions(), maxAge: 0 });
  return res;
}
