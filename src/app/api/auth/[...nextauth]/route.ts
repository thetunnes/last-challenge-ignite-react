import PrismaAdapter from '@/lib/auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: String(process.env.GH_CLIENT_ID),
      clientSecret: String(process.env.GH_CLIENT_SECRET),
      // profile(profile: GithubProfile, tokens) {
      //   return {
      //     id: String(profile.id),
      //     name: profile.name!,
      //     email: profile.email!,
      //     avatar_url: profile.avatar_url,
      //   }
      // },
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      // profile(profile: GoogleProfile, tokens) {
      //   return {
      //     id: profile.sub,
      //     name: profile.name,
      //     email: profile.email,
      //     avatar_url: profile.picture,
      //   }
      // },
    }),
  ],
  callbacks: {
    async session({ session, newSession, user }) {
      return {
        expires: session.expires,
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url,
        },
      }
    },
  },
}

const auth = NextAuth(authOptions)

export { auth as GET, auth as POST }
