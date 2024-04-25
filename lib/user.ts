import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    return user;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({ where: eq(users.id, id) });
    return user;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};

export const activeSubscription = async (id: string) => {
  try {
    const user = await db
      .update(users)
      .set({
        subscription: true,
      })
      .where(eq(users.id, id))
      .execute();
    return user;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};