// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDcayId5zGsXboUszowwtoOUEah2_yLU3c',
  authDomain: 'chatgpt-message.firebaseapp.com',
  projectId: 'chatgpt-message',
  storageBucket: 'chatgpt-message.appspot.com',
  messagingSenderId: '855154140569',
  appId: '1:855154140569:web:cfd3736cd14bc4b4ef9f08',
  measurementId: 'G-F8WDEEXHW6'
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
