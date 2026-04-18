import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import type { Role } from "@/app/generated/prisma/client"

// Emails that get ADMIN role (from .env)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

function getRoleForEmail(email: string): Role {
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? "ADMIN" : "MEMBER"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = (user as unknown as { role: Role }).role
      }
      return session
    },
  },
  events: {
    // Runs after adapter creates the user — set role based on email
    async createUser({ user }) {
      if (user.email) {
        const role = getRoleForEmail(user.email)
        if (role !== "MEMBER") {
          await db.user.update({
            where: { id: user.id },
            data: { role },
          })
        }
      }
    },
  },
  pages: {
    signIn: "/login",
  },
})
