import type { NextAuthConfig } from "next-auth";

// This config is intentionally lightweight — no Prisma, no bcrypt, no database
// imports — because it gets bundled into middleware.ts, which runs on the Edge
// Runtime and can't use Node.js-only packages (like the MySQL driver).
// The actual login providers live in lib/auth.ts instead.
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [], // populated in lib/auth.ts, not here
  callbacks: {
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      const role = (auth?.user as { role?: string } | undefined)?.role;

      if (isAdminRoute) return role === "ADMIN";
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "CUSTOMER";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};
