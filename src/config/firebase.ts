import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyA_wWQak6vhEAqsG7HBbB8Oo3iuhWAsngQ",
  authDomain: "ps3-dynamic-tickets-14379.firebaseapp.com",
  projectId: "ps3-dynamic-tickets-14379",
  storageBucket: "ps3-dynamic-tickets-14379.firebasestorage.app",
  messagingSenderId: "827556412718",
  appId: "1:827556412718:web:bb9ae59374227eb8244ebf",
  measurementId: "G-MELVKB5H0Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
