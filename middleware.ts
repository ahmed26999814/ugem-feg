import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_CLOSED } from "./lib/siteState";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (SITE_CLOSED) {
    if (pathname === "/coming-soon") {
      return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/admin/, "/Admin");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.webmanifest|.*\\..*).*)"],
};
