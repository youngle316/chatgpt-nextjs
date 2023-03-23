import {
  doc,
  DocumentData,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import ConvertToMarkdown from '@/components/markdown';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { db } from '../../service/firebase/firebase';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentChatIdState } from '@/recoil/atom/AtomChat';
import { isGenerateState } from '@/recoil/atom/AtomMessage';
import { chatGPTIsThinking, timeoutMessage } from '@/utils/message';

type MessageProps = {
  message: DocumentData;
};

function Message({ message }: MessageProps) {
  const isChatGPT = message.user.name === 'ChatGPT';

  const { data: session } = useSession();

  const [currentChatId] = useRecoilState(currentChatIdState);
  const [isGenerate, setIsGenerate] = useRecoilState(isGenerateState);

  const regeneratedMessage = async () => {
    await updateDoc(
      doc(
        db,
        'users',
        session?.user?.email!,
        'chats',
        currentChatId,
        'messages',
        message.fireBaseMessageID
      ),
      {
        ...{
          isLoading: true,
          text: chatGPTIsThinking,
          createAt: serverTimestamp()
        }
      }
    ).then(() => {
      setIsGenerate(true);
      fetch('/api/askQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: message.prompt,
          chatId: currentChatId,
          session,
          parentMessageId: message.parentMessageId,
          fireBaseMessageID: message.fireBaseMessageID
        })
      })
        .then((response) => {
          if (response.status === 504) {
            const errorMessage = {
              isLoading: false,
              text: timeoutMessage
            };

            updateDoc(
              doc(
                db,
                'users',
                session?.user?.email!,
                'chats',
                currentChatId,
                'messages',
                message.fireBaseMessageID
              ),
              {
                ...errorMessage
              }
            );
          }
        })
        .finally(() => {
          setIsGenerate(false);
        });
    });
  };

  return (
    <div
      className={`group w-full border-b border-black/10 text-gray-800 
      dark:border-gray-900/50 dark:bg-gray-800 dark:text-gray-100
      ${isChatGPT && 'bg-gray-50'}`}
    >
      <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="relative flex w-[30px] flex-col items-end">
          <div className="relative flex h-[30px] w-[30px] items-center justify-center rounded-sm text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="avatar"
              src={message.user.avatar}
              className="h-7 w-7 rounded-md"
            />
          </div>
        </div>

        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-1 lg:w-[calc(100%-115px)]">
          <div className="text-xs text-black/50 dark:text-white/50">
            {message?.createAt
              ? new Date(message?.createAt?.seconds * 1000).toLocaleString()
              : ''}
          </div>
          <div className="flex flex-grow flex-col gap-4">
            <div className={`${message.isLoading && 'animate-pulse'}`}>
              <ConvertToMarkdown content={message.text} />
            </div>
          </div>
          <div className="flex justify-between">
            {/* 
              Due to the previous version not adding the field 'prompt', 
              only those with this field can be regenerated. 
            */}
            {isChatGPT && !!message?.prompt && (
              <div
                className="mt-2 flex justify-center gap-3 self-end text-gray-400 md:gap-4 
              lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:translate-x-full lg:gap-1 lg:self-center lg:pl-2"
              >
                <button
                  disabled={isGenerate}
                  onClick={regeneratedMessage}
                  className="message-button-icon"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
