import { NextResponse } from "next/server";
import { SITE_ACCESS_CODE, SITE_ACCESS_COOKIE } from "@/lib/siteState";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (code !== SITE_ACCESS_CODE) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SITE_ACCESS_COOKIE, SITE_ACCESS_CODE, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
