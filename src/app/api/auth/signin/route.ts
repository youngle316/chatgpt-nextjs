import { getAdmin } from '@/api/firebase';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const CredentialSchema = z.object({
  id: z.string(),
  publicKey: z.string(),
  algorithm: z.enum(['RS256', 'ES256'])
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = z.string().parse(searchParams.get('username'));

  // search for admin
  const admin = getAdmin();
  // check if the user exists
  const user = await admin.firestore().collection('users').doc(username).get();
  if (!user.exists) {
    return NextResponse.json(
      { message: 'User does not exist' },
      { status: 400 }
    );
  }
  const credential = CredentialSchema.parse(user.data()?.credential);
  return NextResponse.json({
    id: credential.id
  });
}
