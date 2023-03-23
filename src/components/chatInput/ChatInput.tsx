'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { db } from '../../service/firebase/firebase';
import { useRecoilState } from 'recoil';
import {
  parentMessageIdState,
  isGenerateState
} from '@/recoil/atom/AtomMessage';
import { showBottomDivRef } from '@/recoil/atom/AtomRef';
import { useRouter } from 'next/navigation';
import { useScrollToView } from '@/hook/useScrollToView';
import Footer from '../Footer';
import { chatGPTIsThinking } from '@/utils/message';
import { fetchAskQuestion } from '@/api/chatgptApi/fetchData';

type ChatProps = {
  chatId: string;
};

function ChatInput({ chatId }: ChatProps) {
  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();
  const [parentMessageId] = useRecoilState(parentMessageIdState);
  const [showBottomDiv] = useRecoilState(showBottomDivRef);
  const [isGenerate, setIsGenerate] = useRecoilState(isGenerateState);

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

    const chatGPTMessage: Message = {
      prompt: input,
      isLoading: true,
      text: chatGPTIsThinking,
      createAt: serverTimestamp(),
      user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/480px-ChatGPT_logo.svg.png'
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
      chatGPTMessage
    )
      .then((docRef) => {
        scrollIntoView();
        setIsGenerate(true);
        fetchAskQuestion({
          message: {
            prompt: input,
            parentMessageId,
            fireBaseMessageID: docRef.id
          },
          currentChatId: pageId,
          session
        }).finally(() => {
          setIsGenerate(false);
        });
      })
      .then(() => {
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
              disabled={isGenerate}
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

      <div
        className="flex justify-center gap-3 px-3 pt-2 pb-3 text-center text-xs text-black/50 
      dark:text-white/50 md:px-4 md:pt-3 md:pb-6"
      >
        <Footer />
      </div>
    </>
  );
}

export default ChatInput;
