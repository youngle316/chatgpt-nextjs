import { DocumentData } from 'firebase/firestore';

type MessageProps = {
  message: DocumentData;
};

function Message({ message }: MessageProps) {
  const isChatGPT = message.user.name === 'ChatGPT';

  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
      <div className="mx-auto flex max-w-2xl space-x-5 px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="avatar" src={message.user.avatar} className="h-8 w-8" />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
