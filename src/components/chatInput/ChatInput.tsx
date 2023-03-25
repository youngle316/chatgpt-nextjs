'use client';

import {
  PaperAirplaneIcon,
  LanguageIcon,
  ArrowPathIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { db } from '../../service/firebase/firebase';
import { useRecoilState, useSetRecoilState } from 'recoil';
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
import 'react-tooltip/dist/react-tooltip.css';
import useIsMobile from '@/hook/useIsMobile';
import PromptLibModal from '../promptLibModal/PromptLibModal';
import {
  chatInputPromptState,
  promptLibModalState
} from '@/recoil/atom/AtomMessage';
import textAreaAutoHeight from '@/utils/textAreaAutoHeight';

type ChatProps = {
  chatId: string;
};

type TranslateResult = {
  result: { text: string; detectedSourceLang: string };
};

function ChatInput({ chatId }: ChatProps) {
  const [translating, setTranslating] = useState(false);

  const { data: session } = useSession();
  const [parentMessageId] = useRecoilState(parentMessageIdState);
  const [showBottomDiv] = useRecoilState(showBottomDivRef);
  const [isGenerate, setIsGenerate] = useRecoilState(isGenerateState);
  const [chatInputPrompt, setChatInputPrompt] =
    useRecoilState(chatInputPromptState);

  const setPromptLibModal = useSetRecoilState(promptLibModalState);

  const scrollIntoView = useScrollToView(showBottomDiv);

  const isMobile = useIsMobile();

  const router = useRouter();

  const sendMessage = async (e: any) => {
    if (e) {
      e.preventDefault();
    }
    if (!chatInputPrompt) {
      return;
    }

    const input = chatInputPrompt.trim();

    setChatInputPrompt('');

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

    textAreaAutoHeight('chatTextArea');

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

  const chatTextAreaChange = (e: any) => {
    setChatInputPrompt(e.target.value);
    textAreaAutoHeight('chatTextArea');
  };

  const chatTextAreaKeyDown = (e: any) => {
    // shift + enter
    if (e.shiftKey === true && e.keyCode === 13) {
      sendMessage(e);
    }
  };

  const translateToEnglish = (e: any) => {
    e.preventDefault();

    if (!chatInputPrompt) {
      return;
    }
    setTranslating(true);

    fetch('/api/deeplTranslate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: chatInputPrompt
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((res: TranslateResult) => {
        setChatInputPrompt(res.result.text);
      })
      .finally(() => {
        textAreaAutoHeight('chatTextArea');
        setTranslating(false);
      });
  };

  const openPromptLibModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPromptLibModal(true);
  };

  return (
    <>
      <form className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div className="relative flex h-full flex-1 gap-1 md:flex-col">
          <div className="flex items-center justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2">
            {isMobile ? (
              <button onClick={openPromptLibModal}>
                <BookmarkIcon className="h-5 w-5" />
              </button>
            ) : (
              <button onClick={openPromptLibModal} className="indigo-button">
                <BookmarkIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                Prompt
              </button>
            )}
          </div>
          <div className="chat-textarea-container">
            {translating ? (
              <button disabled className="chat-textarea-setting-button">
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              </button>
            ) : (
              <button
                onClick={translateToEnglish}
                className="chat-textarea-setting-button"
              >
                <LanguageIcon className="h-5 w-5" />
              </button>
            )}

            <textarea
              id="chatTextArea"
              style={{ maxHeight: '200px', height: '24px' }}
              disabled={isGenerate}
              className="chat-textarea"
              value={chatInputPrompt}
              onChange={chatTextAreaChange}
              onKeyDown={chatTextAreaKeyDown}
              placeholder="Shift + Enter 发送 Prompt"
            />
            <button className="chat-textarea-send-button" onClick={sendMessage}>
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

      <PromptLibModal />
    </>
  );
}

export default ChatInput;
