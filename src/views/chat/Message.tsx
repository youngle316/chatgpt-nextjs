import { DocumentData } from 'firebase/firestore';

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="avatar"
          src={message.user.avatar}
          className="h-8 w-8 rounded-md"
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
