import { auth } from '@/auth';
import { SignUpForm } from '@/components/signup-form';
import { redirect } from 'next/navigation';
import React from 'react';

const SignUp = async () => {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return <SignUpForm />;
};

export default SignUp;
