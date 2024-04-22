import { auth } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { redirect } from 'next/navigation';

export const getSession = async () => {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return session;
};
