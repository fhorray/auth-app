import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { db } from "./db";
import { getUserByEmail, getUserById } from "./lib/user";

import bcrypt from "bcryptjs";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "E-mail", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (c) => {
      let user = null;

      user = await getUserByEmail(c.email as string);

      if (!user) {
        console.log("Usuário não encontrado");
        return null;
      }

      // Compare password
      const isPasswordCorrect = await bcrypt.compare(
        c.password as string,
        user.password as string
      );

      if (!isPasswordCorrect) {
        console.log("Senha incorreta");
        return null;
      }

      return user;
    },
  }),
  GitHub,
  Google,
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(`${user.id}`);

      // TODO: VERIFY EMAIL
      // if (!existingUser || !existingUser.emailVerified) {
      //   return false;
      // }

      return true;
    },
    async session({ token, session }) {
      console.log("SESSION: ", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as "admin" | "user";
      }

      if (token.role && session.user) {
        session.user.subscription = token.subscription as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      // Verify if the theres a logged user using the token.sub to see the user id, if note return the token.
      if (!token.sub) return token;

      /**
       * Use the function inside lib/user.ts to retireve the first user by id
       * and then assign the user id inside token.sub as the parameter for the function.
       */
      const existingUser = await getUserById(token.sub);

      /**
       * if there's no existing user it'll return the token.
       */
      if (!existingUser) return token;

      /**
       * create a role value inside the token and give it the value
       * of the role thats is inside existingUser.
       */

      token.role = existingUser.role;
      token.subscription = existingUser.subscription;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
});
