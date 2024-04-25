import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Public Page</h1>
      <Button asChild>
        <Link href={'/api/auth/signin'}>Login</Link>
      </Button>
    </>
  );
}
