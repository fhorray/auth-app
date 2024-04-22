import { auth } from '@/auth';
import { getSession } from '@/lib/get-session';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardPage = async () => {
  const session = await getSession();

  return (
    <div>
      <Image
        src={`${session?.user?.image}`}
        alt="Image Profile"
        width={200}
        height={300}
      />
      <h1>{JSON.stringify(session.user)}</h1>
    </div>
  );
};

export default DashboardPage;
