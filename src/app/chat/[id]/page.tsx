import ChatPage from '@/views/chat';

type ChatPageProps = {
  params: {
    id: string;
  };
};

function Chat({ params }: ChatPageProps) {
  return (
    <>
      <ChatPage pageId={params.id} />
    </>
  );
}

export default Chat;
