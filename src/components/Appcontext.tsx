'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const Appcontext = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Appcontext;
