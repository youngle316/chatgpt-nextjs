import Chat from '@/components/Chat';
import ChatInput from '@/components/ChatInput';

type ChatPageProps = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: ChatPageProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
