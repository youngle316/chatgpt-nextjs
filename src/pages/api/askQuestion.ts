import admin from 'firebase-admin';
import chatgptQuery from '../../../lib/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from 'firebaseAdmin';

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: 'Please Provider A Prompt' });
  }

  if (!chatId) {
    res.status(400).json({ answer: 'Please Provider A Valid Chat ID' });
  }

  const response = await chatgptQuery(prompt);

  const message: Message = {
    text:
      response ||
      'ChatGPT was unable to find an answer to your question. Please try again later.',
    createAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k'
    }
  };

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);

  res.status(200).json({ answer: message.text });
}
