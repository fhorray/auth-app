import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: 'admin' | 'user';
  subscription: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
