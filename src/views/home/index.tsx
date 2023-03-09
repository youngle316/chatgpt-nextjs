'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ContentContainer from '@/components/contentContainer';
import Description from '@/components/description';

function Home() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
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
