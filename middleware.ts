import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// A separate, lightweight NextAuth instance built only from the edge-safe
// config — this is what actually runs in middleware. It never imports
// Prisma, so it works on the Edge Runtime.
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/admin/:path*"],
};
