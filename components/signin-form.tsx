'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signUpForm } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { login } from '@/actions/auth';

import { useState, useTransition } from 'react';
import { toast, useToast } from './ui/use-toast';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const SignInForm = () => {
  const [erro, setErro] = useState<string | undefined>();

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signUpForm>) {
    setErro('');

    login(values).then((data) => {
      if (data?.error) {
        setErro(data?.error);
        toast({
          variant: 'destructive',
          title: 'Ops! Something Went Wrong!',
          description: data?.error,
        });
      }

      router.push('/dashboard');
    });
  }

  return (
    <div className="h-screen flex  items-center justify-center">
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>Enter your information to login</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* EMAIL FIELD */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@exemplo.com.br" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD FIELD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
