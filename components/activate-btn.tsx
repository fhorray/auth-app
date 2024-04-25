'use client';

import React from 'react';
import { Button } from './ui/button';
import { activeSubscription } from '@/lib/user';

export const ActivateSubscription = ({
  children,
  session,
}: {
  children?: React.ReactNode;
  session: () => void;
}) => {
  return (
    <>
      <Button>Activate Button</Button>
    </>
  );
};
