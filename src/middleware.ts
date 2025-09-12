import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];
const PRIVATE_ROUTES = ["/dashboard", "/profile"];

function isPublic(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

function isPrivate(pathname: string) {
  return PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (isPublic(pathname) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isPrivate(pathname) && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/profile/:path*"],
};
