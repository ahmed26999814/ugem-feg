import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_ACCESS_CODE, SITE_ACCESS_COOKIE, SITE_CLOSED } from "./lib/siteState";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/admin/, "/Admin");
    return NextResponse.redirect(url);
  }

  if (SITE_CLOSED) {
    const isAllowedPath = pathname === "/coming-soon" || pathname === "/admin2" || pathname.startsWith("/admin2/");
    const cookie = req.cookies.get(SITE_ACCESS_COOKIE)?.value;
    const hasAccess = cookie === SITE_ACCESS_CODE;

    if (isAllowedPath || hasAccess) {
      return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.webmanifest|.*\\..*).*)"],
};
