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

          console.log("User authenticated:", user);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            provider: user.provider || null,
            accessToken: user.token,
            businessId: user.businessId || null,
            // address: user.address || null,
            planName: user.planName || "free",
            planStatus: user.subscriptionStatus || "INACTIVE",
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
    async jwt({ token, user, trigger, session }) {
      // En login inicial
      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = (user as any).accessToken;
        token.address = (user as any).address || null;
        token.role = (user as any).role || "user";
        token.provider = (user as any).provider || null;
        token.businessId = (user as any).businessId || null;
        token.planName = (user as any).planName || "free";
        token.planStatus = (user as any).planStatus || "INACTIVE";
      }

      // Cuando se llama update() desde el cliente
      if (trigger === "update" && session?.user) {
        console.log("JWT callback - update trigger:", session);

        // Actualizar token con los nuevos datos
        token.id = session.user.id || token.id;
        token.name = session.user.name || token.name;
        token.email = session.user.email || token.email;
        token.role = session.user.role || token.role;
        token.provider = session.user.provider || token.provider;
        token.accessToken = session.user.accessToken || token.accessToken;
        token.address = session.user.address || token.address;
        token.businessId = (session.user as any).businessId || token.businessId;
        token.planName = (session.user as any).planName || token.planName;
        token.planStatus = (session.user as any).subscriptionStatus || token.subscriptionStatus;
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

          // devuelves los extras que quieres pasar
          user.id = backendUser.id;
          user.name = backendUser.name;
          user.email = backendUser.email;
          (user as any).role = backendUser.role;
          (user as any).provider = backendUser.provider;
          (user as any).accessToken = backendUser.token;
          (user as any).businessId = backendUser.businessId || null;

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
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).businessId = token.businessId;
        (session.user as any).plan = {
          name: token.planName,
          status: token.planStatus,
        }

        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
