import { auth, signIn, providerMap } from "@/auth";
import { SignInForm } from "@/components/signin-form";

import { redirect } from "next/navigation";
import React from "react";

const SignIn = async () => {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <SignInForm />;
};

export default SignIn;
