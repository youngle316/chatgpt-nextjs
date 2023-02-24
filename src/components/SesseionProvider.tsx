'use client';

import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

type SessionProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

export function SessionProvider({ children, session }: SessionProviderProps) {
  return <Provider>{children}</Provider>;
}
