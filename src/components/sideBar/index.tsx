'use client';
import NewChat from './NewChat';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../service/firebase/firebase';
import ChatRow from './ChatRow';
import Setting from '../setting';
import { useI18n } from '@/hook/useI18n';
import BasicInput from '../Input';
import { useState } from 'react';

function SideBar() {
  const [searchValue, setSearchValue] = useState<string>('');

  const { data: session } = useSession();

  const { t } = useI18n();

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
                <p>{t('loadingChats')}</p>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <BasicInput
                    setData={setSearchValue}
                    placeholder={t('searchTitle')}
                  />
                </div>

                {chats?.docs?.map((doc) => {
                  const { title } = doc.data();
                  if (searchValue) {
                    if (title && title.includes(searchValue)) {
                      return (
                        <ChatRow
                          key={doc?.id}
                          id={doc?.id}
                          chatContentData={chatContentData}
                        />
                      );
                    }
                  } else {
                    return (
                      <ChatRow
                        key={doc?.id}
                        id={doc?.id}
                        chatContentData={chatContentData}
                      />
                    );
                  }
                })}
              </>
            )}
          </div>
          {session && <Setting />}
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
