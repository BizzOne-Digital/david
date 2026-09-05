import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@/types";
import { authSecret } from "@/lib/auth/secret";

export const publicAdminRoutes = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

export const authConfig = {
  secret: authSecret,
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role: UserRole }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
