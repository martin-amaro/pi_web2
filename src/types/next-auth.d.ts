import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      accessToken?: string;
      businessId?: string | null;
      plan?: {
        name: string;
        status: string;
      }
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    accessToken?: string;
    businessId?: string | null;
  }
}
