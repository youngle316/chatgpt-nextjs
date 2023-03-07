'use client';
import { RecoilRoot } from 'recoil';

type AtomProviderProps = {
  children: React.ReactNode;
};

export function AtomProvider({ children }: AtomProviderProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
