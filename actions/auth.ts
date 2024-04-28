"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { signInForm, signUpForm } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/user";
import { z } from "zod";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export const register = async (values: z.infer<typeof signUpForm>) => {
  try {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser) {
      throw new Error("Email already in use!");
    }

    const hashedPassword = await bcrypt.hash(values.password, 10);

    await db.insert(users).values({
      name: values.name,
      email: values.email,
      password: hashedPassword,
    });

    // Autenticate user after creating acc.
    const signInResult = await signIn("credentials", {
      redirect: false, // Prevents automatic redirection
      email: values.email,
      password: values.password,
    });

    if (signInResult.error) {
      throw new Error(signInResult.error);
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const login = async (values: z.infer<typeof signInForm>) => {
  try {
    const signInResult = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (signInResult.error) {
      // Handle the sign-in error (e.g., invalid credentials)
      throw new Error(signInResult.error);
    } else {
      // Handle successful sign-in
      // For example, redirect the user or show a success message
      // window.location.href = '/dashboard'; // Redirect user to dashboard
      // REMOVER ESSA PARTE E ADD APENAS UM RETURN
    }
  } catch (error: any) {
    return { error: "Ops, credenciais erradas!" };
  }
};
