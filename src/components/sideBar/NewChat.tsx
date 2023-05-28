'use client';

import { PlusIcon } from '@heroicons/react/24/solid';
import { db } from '../../service/firebase/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { openState } from '@/recoil/atom/AtomSlideOver';
import { useI18n } from '@/hook/useI18n';

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();
  const openStateChange = useSetRecoilState(openState);

  const { t } = useI18n();

  const createNewChat = async () => {
    const chatContent: ChatContent = {
      title: 'Chat Title',
      message: [],
      userId: session?.user?.name!,
      createAt: serverTimestamp()
    };
    const doc = await addDoc(
      collection(db, 'users', session?.user?.name!, 'chats'),
      chatContent
    );
    openStateChange(false);
    router.push(`/chat/${doc.id}`);
  };

  return (
    <a onClick={createNewChat} className="chatRow border border-gray-700">
      <PlusIcon className="h-4 w-4" />
      <p>{t('newChat')}</p>
    </a>
  );
}

export default NewChat;
