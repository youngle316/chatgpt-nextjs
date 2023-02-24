'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { db } from '../../firebase';

type ChatProps = {
  chatId: string;
};

function ChatInput({ chatId }: ChatProps) {
  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();

  const { data: model } = useSWR('model', {
    fallbackData: 'text-davinci-003'
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) {
      return;
    }

    const input = prompt.trim();

    setPrompt('');

    const message: Message = {
      text: input,
      createAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image!
      }
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );

    const notification = toast.loading('ChatGPT is thinking...');

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session
      })
    }).then(() => {
      toast.success('ChatGPT has responded!', {
        id: notification
      });
    });
  };

  return (
    <div className="mx-20 my-10 rounded-lg bg-gray-700/50 text-sm text-gray-400">
      <form onSubmit={sendMessage} className="flex space-x-5 p-5">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your message here..."
          disabled={!session}
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
        />
        <button
          className="hover:cursor-pointer hover:bg-black disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          type="submit"
        >
          <PaperAirplaneIcon className=" m-1 h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
