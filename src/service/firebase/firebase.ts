// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8xml0DPDA0dxydvwTonQLja83cEUez6Q",
  authDomain: "metopia.firebaseapp.com",
  projectId: "metopia",
  storageBucket: "metopia.appspot.com",
  messagingSenderId: "825481221211",
  appId: "1:825481221211:web:84a24e62525574f8461b7e",
  measurementId: "G-DX1YG2JT7F"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
