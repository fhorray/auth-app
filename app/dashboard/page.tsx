import { auth } from '@/auth';
import { ActivateSubscription } from '@/components/activate-btn';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/get-session';
import { activeSubscription } from '@/lib/user';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">This is a protected Route</h1>
      <span>{JSON.stringify(session?.user)}</span>
      <Button asChild>
        <Link href={'/api/auth/signout'}>Logout</Link>
      </Button>
    </div>
  );
};

export default DashboardPage;
