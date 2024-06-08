import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Informations d'identification manquantes");
        }

        const user = await prismadb.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Informations d'identification non valides");
        }

        const verifyPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!verifyPassword) {
          throw new Error("Mot de passe non valide");
        }
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV !== "production",
};
