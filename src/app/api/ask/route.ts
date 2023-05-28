import chatgptQuery from '@/api/chatgptApi/queryApi';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const RequestSchema = z.object({
  prompt: z.string(),
  parentMessageId: z.string()
});

export async function POST(request: Request) {
  const { prompt, parentMessageId } = RequestSchema.parse(await request.json());

  const result = await chatgptQuery(prompt, parentMessageId);

  return NextResponse.json({
    hello: 'world'
  });
}
