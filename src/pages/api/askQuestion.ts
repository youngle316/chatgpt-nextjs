import chatgptQuery from '../../api/chatgptApi/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  answer?: string;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, parentMessageId } = req.body;

  const result = await chatgptQuery(prompt, parentMessageId);

  res.status(200).json({ result });
}
