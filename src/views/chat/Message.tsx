import { DocumentData } from 'firebase/firestore';
import ConvertToMarkdown from '@/components/markdown';

type MessageProps = {
  message: DocumentData;
};

function Message({ message }: MessageProps) {
  const isChatGPT = message.user.name === 'ChatGPT';

  return (
    <div
      className={`group w-full border-b border-black/10 text-gray-800 dark:border-gray-900/50 dark:bg-gray-800 dark:text-gray-100 ${
        isChatGPT && 'bg-gray-50'
      }`}
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

        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-4">
            <ConvertToMarkdown content={message.text} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
