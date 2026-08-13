import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "./password";
import { loginAccountSchema } from "@/lib/validations/auth.schema";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("=== LOGIN DEBUG START ===");
        console.log("Raw credentials:", credentials);

        const parsedCredentials = loginAccountSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("ZOD VALIDATION FAILED:", parsedCredentials.error.flatten());
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const normalizedEmail = email.toLowerCase().trim();
        console.log("Looking up email:", normalizedEmail);

        const existingUser = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        console.log("User found in DB:", existingUser ? existingUser.email : "NOT FOUND");
        console.log("passwordHash exists:", !!existingUser?.passwordHash);

        if (!existingUser || !existingUser.passwordHash) {
          console.log("=== FAILED: no user or no passwordHash ===");
          return null;
        }

        const isPasswordValid = await verifyPassword(password, existingUser.passwordHash);
        console.log("Password valid:", isPasswordValid);
        console.log("=== LOGIN DEBUG END ===");

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};