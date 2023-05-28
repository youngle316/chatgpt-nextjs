import { z } from 'zod';
import { KvStoreType } from './kv.utils';
import axios from 'axios';
import { client } from '@passwordless-id/webauthn';
import { AuthenticationEncoded } from '@passwordless-id/webauthn/dist/esm/types';

const ChallengeSchema = z.object({
  challenge: z.string()
});

export class PasswordlessAuthenticationService {
  static async getChallenge(
    type: KvStoreType,
    userId: string
  ): Promise<string> {
    const response = await axios.get(
      `/api/challenge?type=${type}&userId=${userId}`
    );
    const data = ChallengeSchema.parse(response.data);
    return data.challenge;
  }

  static async registration(username: string) {
    // check if username greater than 3 characters
    if (username.length < 3) {
      throw new Error('Username must be greater than 3 characters');
    }

    if (!client.isAvailable()) {
      throw new Error('WebAuthn is not available');
    }
    // since we don't have the user id yet, we'll use the username as the user id
    const challenge = await this.getChallenge('registration', username);
    const credential = await client.register(username, challenge);
    await axios.post('/api/auth/registration', credential);
  }

  static async getSigninId(username: string): Promise<string> {
    const data = await axios.get(`/api/auth/signin?username=${username}`);
    return z.string().parse(data.data.id);
  }

  static async prepareSignin(username: string) {
    if (!client.isAvailable()) {
      throw new Error('WebAuthn is not available');
    }
    const challenge = await this.getChallenge('authentication', username);
    const id = await this.getSigninId(username);
    const credential = await client.authenticate([id], challenge, {
      authenticatorType: 'auto',
      userVerification: 'required',
      timeout: 60000
    });
    return credential;
  }
}
