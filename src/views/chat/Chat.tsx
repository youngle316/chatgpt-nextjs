'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../service/firebase/firebase';
import Message from './Message';
import { parentMessageIdState } from '@/recoil/atom/AtomChat';
import Description from '@/components/description';

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
    const lastData = data && data[data.length - 1];
    setParentMessageId(lastData ? lastData.get('parentMessageId')! : '');
  }, [messages]);

  return (
    <>
      {messages?.docs.length === 0 && <Description />}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </>
  );
}

export default Chat;
