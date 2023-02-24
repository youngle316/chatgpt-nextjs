'use client';

import { PlusIcon } from '@heroicons/react/24/solid';
import { db } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

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
    <div onClick={createNewChat} className="chatRow border border-gray-700">
      <PlusIcon className="h-4 w-4" />
      <p>NewChat</p>
    </div>
  );
}

export default NewChat;
