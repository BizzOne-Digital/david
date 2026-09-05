import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { authSecret } from "@/lib/auth/secret";
import { publicAdminRoutes } from "@/lib/auth/auth.config";

const sessionCookieNames = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

function hasSessionCookie(req: NextRequest): boolean {
  return sessionCookieNames.some((name) => req.cookies.has(name));
}

function clearStaleSessionCookies(response: NextResponse): NextResponse {
  for (const name of sessionCookieNames) {
    response.cookies.delete(name);
  }
  return response;
}

function withPathnameHeader(req: NextRequest, pathname: string): NextResponse {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicAdminRoute = publicAdminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const token = await getToken({
    req,
    secret: authSecret,
    secureCookie: req.nextUrl.protocol === "https:",
  });

  if (isPublicAdminRoute) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    const response = withPathnameHeader(req, pathname);
    if (hasSessionCookie(req)) {
      return clearStaleSessionCookies(response);
    }
    return response;
  }

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    const response = NextResponse.redirect(loginUrl);
    if (hasSessionCookie(req)) {
      return clearStaleSessionCookies(response);
    }
    return response;
  }

  return withPathnameHeader(req, pathname);
}

export const config = {
  matcher: ["/admin/:path*"],
};
