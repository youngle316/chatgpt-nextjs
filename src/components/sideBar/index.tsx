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

  const [chatContentData] = useCollection(
    query(collection(db, 'users', session?.user?.email!, 'chats'))
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-full w-full flex-1 items-start border-white/20">
        <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
          <NewChat />
          <div className="flex-1 flex-col overflow-y-auto border-b border-white/20">
            {loading ? (
              <div className="flex h-full animate-pulse items-center justify-center text-center text-white">
                <p>Loading Chats...</p>
              </div>
            ) : (
              <>
                {chats?.docs?.map((doc) => {
                  return (
                    <ChatRow
                      key={doc?.id}
                      id={doc?.id}
                      chatContentData={chatContentData}
                    />
                  );
                })}
              </>
            )}
          </div>
        </nav>
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
