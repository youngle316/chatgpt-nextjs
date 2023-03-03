'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import Message from './Message';
import { parentMessageIdState } from '@/atom/AtomChat';

type ChatProps = {
  chatId: string;
};

function Chat({ chatId }: ChatProps) {
  const { data: session } = useSession();
  const setParentMessageId = useSetRecoilState(parentMessageIdState);

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createAt', 'asc')
      )
  );

  useEffect(() => {
    const data = messages?.docs;
    setParentMessageId(data ? data[data.length - 1]?.id! : '');
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-lg text-white">
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className="mx-auto mt-5 h-10 w-10 animate-bounce text-white" />
        </>
      )}

      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
}

export default Chat;
