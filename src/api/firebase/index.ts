import admin from 'firebase-admin';
import { z } from 'zod';

const serviceAccount = z.string().parse(process.env.FIREBASE_ADMIN_CONFIG);

export const getAdmin = () => {
  // cache the admin instance
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount))
    });
  }
  return admin;
};
