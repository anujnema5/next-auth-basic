import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { signIn } from "next-auth/react";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-in',
    signOut : '/sign-out'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: 'test@gmail.com' },
        password: { label: "Password", type: "password", placeholder: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) return null

        if (user?.password === password) {
          return user;
        }
        // if user doesn't exist or password doesn't match
        // if (!user || !(await compare(password, user.password))) {
        //   throw new Error("Invalid username or password");
        // }
        return null;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return session
    },

    jwt({ token, account, user }) {
      return token;
    },
  },

  session: {
    strategy: 'jwt'
  },
  secret: process.env.JWT_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };