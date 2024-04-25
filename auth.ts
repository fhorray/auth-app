import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { db } from './db';
import { getUserById } from './lib/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'admin' | 'user';
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
  session: { strategy: 'jwt' },
  providers: [GitHub, Google],
});
