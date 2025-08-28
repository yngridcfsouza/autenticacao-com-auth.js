import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  const { pathname } = request.nextUrl;
  const isPrivatePath = pathname.startsWith('/dashboard');

  if (isPrivatePath && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoggedIn && !isPrivatePath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
});

export const config = {
  matcher: [
    '/register',
    '/login',
    '/dashboard',
    '/dashboard/:path*',
  ],
};
