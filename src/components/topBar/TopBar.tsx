'use client';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';
import { useSetRecoilState } from 'recoil';
import { openState } from '@/recoil/atom/AtomSlideOver';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { db } from '../../service/firebase/firebase';
import { useI18n } from '@/hook/useI18n';

function TopBar() {
  const setOpen = useSetRecoilState(openState);

  const router = useRouter();

  const { data: session } = useSession();

  const { t } = useI18n();

  const showSideBar = () => {
    setOpen(true);
  };

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, 'users', session?.user?.name!, 'chats'),
      {
        message: [],
        userId: session?.user?.name!,
        createAt: serverTimestamp()
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
      <div
        onClick={showSideBar}
        className="inline-flex h-10 items-center justify-center px-3"
      >
        <Bars3Icon className="h-6 w-6" />
      </div>
      <h1 className="flex-1 text-center text-base font-normal">
        {t('newChat')}
      </h1>
      <div className="px-3">
        <PlusIcon onClick={createNewChat} className="h-6 w-6" />
      </div>
    </div>
  );
}

export default TopBar;
