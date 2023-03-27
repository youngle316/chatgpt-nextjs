'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ContentContainer from '@/components/contentContainer';
import Description from '@/components/description';
import useRouterAddLocale from '@/hook/useRouterAddLocale';

function Home() {
  const { data: session } = useSession();

  const routerAddLocale = useRouterAddLocale();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push(`${routerAddLocale}/login`);
    }
  }, [session]);

  return (
    <>
      {session && (
        <ContentContainer>
          <Description />
        </ContentContainer>
      )}
    </>
  );
}

export default Home;
