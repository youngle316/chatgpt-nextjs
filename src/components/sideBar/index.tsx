'use client';
import NewChat from './NewChat';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../service/firebase/firebase';
import ChatRow from './ChatRow';
import Setting from '../setting';
import { useTranslations } from 'next-intl';

function SideBar() {
  const { data: session } = useSession();

  const t = useTranslations('sideBar');

  const [chats, loading] = useCollection(
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
                <p>{t('loadingChats')}</p>
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
      {session && <Setting />}
    </div>
  );
}

export default SideBar;
