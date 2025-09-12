import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Opcional pero recomendado: usa JWT para evitar estado en DB si no lo necesitas
  session: { strategy: "jwt" },

  // Página de login personalizada. Si no hay sesión y `authorized` devuelve false,
  // NextAuth redirige aquí automáticamente.
  pages: {
    signIn: "/login",
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          if (!res.ok) {
            if (res.status === 401)
              throw new Error("Correo o contraseña incorrectos.");
            if (res.status === 400) throw new Error("Solicitud inválida.");
            if (res.status >= 500)
              throw new Error("Error interno del servidor.");
            throw new Error("Error desconocido.");
          }

          const user = await res.json();
          if (!user) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            provider: user.provider || null
          };
        } catch (err: any) {
          // 🚨 Captura cuando no hay backend disponible
          console.error("Auth error:", err.message);
          throw new Error("No se pudo conectar al servidor de autenticación.");
        }
      },
    }),
  ],

  // AQUÍ se decide quién pasa y quién no
  callbacks: {
    // Se ejecuta en el middleware

    // redirect({ url, baseUrl}) {
    //   return "/dashboard";
    // },

    async jwt({ token, user }) {
      // Primera vez que el usuario inicia sesión
      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.email = user.email;

        // lo que devuelva tu backend extra
        token.address = (user as any).address || null;
        token.role = (user as any).role || "user";
        token.provider = (user as any).provider || null;
      }
      return token;
    },

    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      // Rutas públicas que no deben bloquearse
      const isPublic =
        pathname === "/login" ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/_next") ||
        pathname === "/favicon.ico";

      if (isPublic) return true;

      if (pathname.startsWith("/dashboard")) {
        return !!auth?.user;
      }

      return true;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                provider: account.provider,
                providerId: account.providerAccountId,
              }),
            }
          );

          if (!res.ok) return false;

          const backendUser = await res.json();

          console.log("-----------------")
          console.log(backendUser)

          // devuelves los extras que quieres pasar
          user.id = backendUser.id;
          user.name = backendUser.name;
          user.email = backendUser.email;
          user.role = backendUser.role;
          user.provider = backendUser.provider;
        } catch (err) {
          console.error("Error en signIn:", err);
          return false;
        }
      }

      return true;
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).address = token.address;
        (session.user as any).role = token.role;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },
});
