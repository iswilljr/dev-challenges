/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextAuthOptions } from 'next-auth'
import GithubProvider, { type GithubProfile } from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/utils/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile: GithubProfile, tokens) {
        return {
          id: profile.id.toString(),
          bio: profile.bio,
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          twitterUsername: profile.twitter_username,
          website: profile.blog,
        }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      return {
        user,
        expires: session.expires,
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    error: '/',
  },
}
