'use client';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';
import { useRecoilState } from 'recoil';
import { openState } from '@/atom/AtomSlideOver';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { db } from '../../firebase';

function TopBar() {
  const [open, setOpen] = useRecoilState(openState);

  const router = useRouter();

  const { data: session } = useSession();

  const showSideBar = () => {
    setOpen(true);
  };

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats'),
      {
        message: [],
        userId: session?.user?.email!,
        createAt: serverTimestamp()
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  return (
    <>
      <div onClick={showSideBar}>
        <Bars3Icon className="h-6 w-6" />
      </div>
      New Chat
      <PlusIcon onClick={createNewChat} className="h-6 w-6" />
    </>
  );
}

export default TopBar;
