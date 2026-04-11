import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Get the refresh token from cookies
  // (Using refreshToken because accessToken might expire while the session is still valid)
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthPage = pathname.startsWith("/login");
  const isAdminPage = pathname.startsWith("/admin");

  // 2. Protect admin routes
  if (isAdminPage && !isAuthPage) {
    if (!refreshToken) {
      // Not logged in, redirect to login
      const loginUrl = new URL("/login", request.url);
      // Optional: Store the page they were trying to visit to redirect back later
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Redirect authenticated users away from login page
  if (isAuthPage) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// 4. Matcher configuration
// This ensures middleware only runs on admin routes and doesn't slow down
// static files, images, or the homepage.
export const config = {
  matcher: ["/admin/:path*"],
};
