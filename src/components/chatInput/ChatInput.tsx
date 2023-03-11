'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { db } from '../../service/firebase/firebase';
import { useRecoilState } from 'recoil';
import { parentMessageIdState } from '@/recoil/atom/AtomChat';
import { showBottomDivRef } from '@/recoil/atom/AtomRef';
import { useRouter } from 'next/navigation';
import { useScrollToView } from '@/hook/useScrollToView';

type ChatProps = {
  chatId: string;
};

function ChatInput({ chatId }: ChatProps) {
  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();
  const [parentMessageId] = useRecoilState(parentMessageIdState);
  const [showBottomDiv] = useRecoilState(showBottomDivRef);

  const scrollIntoView = useScrollToView(showBottomDiv);

  const router = useRouter();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) {
      return;
    }

    const input = prompt.trim();

    setPrompt('');

    scrollIntoView();

    let pageId = chatId;

    if (!chatId) {
      const doc = await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats'),
        {
          message: [],
          userId: session?.user?.email!,
          createAt: serverTimestamp()
        }
      );
      router.push(`/chat/${doc.id}`);
      pageId = doc.id;
    }

    const notification = toast.loading('ChatGPT is thinking...');

    const message: Message = {
      text: input,
      createAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image!
      }
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        pageId,
        'messages'
      ),
      message
    );

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input,
        chatId: pageId,
        session,
        parentMessageId
      })
    }).then(() => {
      toast.success('ChatGPT has responded!', {
        id: notification
      });
      scrollIntoView();
    });
  };

  return (
    <>
      <form
        onSubmit={sendMessage}
        className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
      >
        <div className="relative flex h-full flex-1 md:flex-col">
          <div className="ml-1 mt-1.5 flex justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2"></div>
          <div className="chat-textarea-container">
            <input
              className="chat-textarea"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
            />
            <button className="chat-textarea-button" type="submit">
              <PaperAirplaneIcon className="m-1 h-4 w-4 -rotate-45" />
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
        Developed using gpt-3.5-turbo API by &nbsp;
        <a
          className="underline"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/transitive-bullshit/chatgpt-api"
        >
          chatgpt-api
        </a>
      </div>
    </>
  );
}

export default ChatInput;
