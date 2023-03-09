import chatgptQuery from '../../api/chatgptApi/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/service/firebase/firebase';

type Data = {
  answer: string;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, session, parentMessageId } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: 'Please Provider A Prompt' });
  }

  if (!chatId) {
    res.status(400).json({ answer: 'Please Provider A Valid Chat ID' });
  }

  const result = await chatgptQuery(prompt, parentMessageId);

  const message: Message = {
    parentMessageId: result.id || '',
    text:
      result.text ||
      'ChatGPT was unable to find an answer to your question. Please try again later.',
    createAt: serverTimestamp(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/480px-ChatGPT_logo.svg.png'
    }
  };

  await addDoc(
    collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
    message
  );

  res.status(200).json({ answer: message.text, result });
}
