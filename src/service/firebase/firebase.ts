// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string;

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(JSON.parse(firebaseConfig));
const db = getFirestore(app);

export { db };
