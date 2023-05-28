import { z } from 'zod';

export const KvStoreTypeSchema = z.enum([
  'registration',
  'authentication',
  'authenticated'
]);

export type KvStoreType = z.infer<typeof KvStoreTypeSchema>;

/**
 * Get KV key for a given type and user ID
 * @param type KV key type
 * @param userId User ID
 * @returns
 */
export function getKey(type: KvStoreType, userId: string) {
  return `chatgpt:${type}:${userId}`;
}
