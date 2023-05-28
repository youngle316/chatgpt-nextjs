import deepLTranslate from '@/api/chatgptApi/deeplApi';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const RequestSchema = z.object({
  prompt: z.string()
});

export async function POST(request: Request) {
  const { prompt } = RequestSchema.parse(await request.json());

  const result = await deepLTranslate(prompt);

  return NextResponse.json({ result });
}
