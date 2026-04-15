import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@/app/generated/prisma"
import type { Role } from "@/app/generated/prisma"

const prisma = new PrismaClient()

// Emails jo admin hain (env se aata hai)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

// Emails jo trainer hain (env se aata hai)
const TRAINER_EMAILS = (process.env.TRAINER_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

function getRoleForEmail(email: string): Role {
  const lower = email.toLowerCase()
  if (ADMIN_EMAILS.includes(lower)) return "ADMIN"
  if (TRAINER_EMAILS.includes(lower)) return "TRAINER"
  return "MEMBER"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      // Role aur id session mein add karo
      if (session.user) {
        session.user.id = user.id
        session.user.role = (user as { role: Role }).role
      }
      return session
    },
    async signIn({ user }) {
      // Pehli baar login par role assign karo
      if (user.email) {
        const role = getRoleForEmail(user.email)
        await prisma.user.upsert({
          where: { email: user.email },
          update: {}, // already exists — role mat badlo
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
            role,
          },
        })
      }
      return true
    },
  },
  pages: {
    signIn: "/login",
  },
})
