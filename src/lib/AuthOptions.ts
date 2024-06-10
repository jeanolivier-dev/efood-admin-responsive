import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {Users, UserType} from "@/database/schema";
import { db } from "@/database/dbConnection";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import {User} from "@/type/interfaces";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'mail@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials:any) {
        const user =
          credentials &&
          (await db
            .select()
            .from(Users)
            .where(eq(Users.email, credentials.email)));

        if (!user) {
          throw new Error("Informations d'identification non valides");
        }

        const verifyPassword = await bcrypt.compare(
          credentials.password,
          user[0].password
        );

        if (verifyPassword) {
          return user[0];
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if(user) token.user = user as User
      return token
      // return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV !== "production",
};
