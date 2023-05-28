import { getAdmin } from '@/api/firebase';
import { PasswordlessAuthenticationService } from '@/service/firebase/webauthn/authentication.service';
import { getKey } from '@/service/firebase/webauthn/kv.utils';
import { server } from '@passwordless-id/webauthn';
import { kv } from '@vercel/kv';
import { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

const CredentialSchema = z.object({
  id: z.string(),
  publicKey: z.string(),
  algorithm: z.enum(['RS256', 'ES256'])
});

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        credentialId: {
          label: 'credentialId',
          type: 'text'
        },
        authenticatorData: { label: 'authenticatorData', type: 'text' },
        clientData: { label: 'authenticatorData', type: 'text' },
        signature: { label: 'authenticatorData', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials');
        }
        const { username, ...credentialData } = credentials;
        console.log('credentialData', credentials);
        const key = getKey('authentication', username);

        if (!(await kv.exists(key))) {
          throw new Error('No registration session found');
        }

        console.log('key', await kv.get(key));

        const session = z
          .object({
            challenge: z.string()
          })
          .parse(await kv.get(key));

        const admin = getAdmin();
        const user = await admin
          .firestore()
          .collection('users')
          .doc(username)
          .get();
        if (!user.exists) {
          throw new Error('User does not exist');
        }

        const credential = CredentialSchema.parse(user.data()?.credential);

        const result = await server.verifyAuthentication(
          credentialData,
          credential,
          {
            origin: () => true,
            challenge: session.challenge,
            userVerified: false,
            counter: -1
          }
        );

        return {
          id: result.credentialId,
          name: username
        };
      }
    })
  ],
  callbacks: {
    // async jwt({ token, user, account, profile, isNewUser }: any) {
    //   if (user) {
    //     token.accessToken = user.accessToken;
    //     token.user = user.user;
    //   }
    //   return token;
    // },
    // async session({ session, token, user }: any) {
    //   session.accessToken = token.accessToken;
    //   session.user = token.user;
    //   return session;
    // }
  },
  session: {
    strategy: 'jwt'
  }
};
