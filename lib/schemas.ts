import * as z from 'zod';

export const signUpForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
