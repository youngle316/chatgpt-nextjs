import { openState } from '@/atom/AtomSlideOver';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSetRecoilState } from 'recoil';
import { db } from '../../service/firebase/firebase';

type ChatRowProps = {
  id: string;
};

function ChatRow({ id }: ChatRowProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const openStateChange = useSetRecoilState(openState);

  const [messages] = useCollection(
    query(
      collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
      orderBy('createAt', 'asc')
    )
  );

  useEffect(() => {
    if (!pathname) {
      return;
    }
    setActive(pathname.includes(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/');
  };

  const linkToChat = () => {
    openStateChange(false);
  };

  return (
    <Link
      onClick={linkToChat}
      href={`/chat/${id}`}
      className={`chatRow ${active && 'bg-gray-700/50'}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className=" max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
        {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 cursor-pointer text-gray-700 hover:text-red-700"
      />
    </Link>
  );
}

export default ChatRow;
