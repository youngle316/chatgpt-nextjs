import {
  KvStoreTypeSchema,
  getKey
} from '@/service/firebase/webauthn/kv.utils';
import { v1 } from 'uuid';
import { kv } from '@vercel/kv';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { config } from '@/config';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    // get challenge type and user id from query params
    const storeType = KvStoreTypeSchema.parse(searchParams.get('type'));
    const userId = z.string().parse(searchParams.get('userId'));
    // generate a challenge
    const challenge = v1();
    // get the key this challenge
    const kvKey = getKey(storeType, userId);
    if (await kv.exists(kvKey)) {
      const data = await kv.get(kvKey);
      return NextResponse.json(data);
    }

    // store the challenge in the kv store
    await kv.set(kvKey, JSON.stringify({ challenge }));
    await kv.expire(kvKey, config.defaultKvExpiration);

    return NextResponse.json({ challenge });
  } catch (err) {
    // check if the error is a zod error
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    throw err;
  }
}
