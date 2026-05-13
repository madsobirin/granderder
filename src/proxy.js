import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  // kalau belum login dan akses dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // kalau sudah login dan buka login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
