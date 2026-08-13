import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

const PROTECTED_PATH_PREFIXES = [
  "/dashboard",
  "/inbox",
  "/leads",
  "/automations",
  "/instagram",
  "/pipelines",
  "/knowledge",
  "/analytics",
  "/team",
  "/settings",
];
const AUTH_ONLY_PATHS = ["/login", "/register"];

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isAuthenticated = !!request.auth;

  const isProtectedPath = PROTECTED_PATH_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthOnlyPath = AUTH_ONLY_PATHS.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  if (isAuthOnlyPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inbox/:path*",
    "/leads/:path*",
    "/automations/:path*",
    "/instagram/:path*",
    "/pipelines/:path*",
    "/knowledge/:path*",
    "/analytics/:path*",
    "/team/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};