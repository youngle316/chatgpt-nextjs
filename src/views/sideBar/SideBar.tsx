'use client';
import NewChat from './NewChat';
import { useSession, signOut } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../service/firebase/firebase';
import ChatRow from './ChatRow';

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createAt', 'asc')
      )
  );

  return (
    <div className="flex h-full flex-col p-2">
      <div className="flex-1">
        <NewChat />

        <div className="my-2 flex flex-col space-y-2">
          {loading && (
            <div className="animate-pulse text-center text-white">
              <p>Loading Chats...</p>
            </div>
          )}
        </div>

        {chats?.docs?.map((doc) => {
          return <ChatRow key={doc?.id} id={doc?.id} />;
        })}
      </div>
      {session && (
        <Image
          onClick={() => signOut()}
          width={48}
          height={48}
          src={session.user?.image!}
          alt="image"
          className="mx-auto mb-2 cursor-pointer rounded-full hover:opacity-50"
        />
      )}
    </div>
  );
}

export default SideBar;
