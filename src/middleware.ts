import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];
const PRIVATE_ROUTES = ["/dashboard", "/profile"];
const ADMIN_ROUTES = ["/dashboard/staff"];

function match(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Usuario autenticado intenta ir a login o register
  if (match(pathname, PUBLIC_ROUTES) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Ruta privada sin sesión
  if (match(pathname, PRIVATE_ROUTES) && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Solo admins pueden entrar a ciertas rutas
  if (match(pathname, ADMIN_ROUTES)) {
    const role = session?.user?.role;
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/profile/:path*"],
};
