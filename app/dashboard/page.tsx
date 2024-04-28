import { auth } from "@/auth";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">This is a protected Route</h1>
      <span>{JSON.stringify(session?.user)}</span>

      {session?.user.subscription && <h1>Now you&apos;re a PREMIUM USER!</h1>}
      <Button asChild>
        <Link href={"/api/auth/signout"}>Logout</Link>
      </Button>
    </div>
  );
};

export default DashboardPage;
