import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // si está logueado y quiere entrar al login → redirigir al dashboard
  if (pathname === "/login" && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // si no está logueado e intenta entrar a /dashboard → mandarlo al login
  if (pathname.startsWith("/dashboard") && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // todo lo demás sigue normal
  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/dashboard/:path*"], // 👈 incluye login y dashboard
};
