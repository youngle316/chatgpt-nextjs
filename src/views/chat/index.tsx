import ContentContainer from '@/components/contentContainer';
import Chat from './Chat';

type ChangePageProps = {
  pageId: string;
};

function ChatPage({ pageId }: ChangePageProps) {
  return (
    <ContentContainer pageId={pageId}>
      <Chat chatId={pageId} />
    </ContentContainer>
  );
}

export default ChatPage;
