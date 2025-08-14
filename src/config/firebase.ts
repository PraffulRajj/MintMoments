import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyCTRv5ckWTZ-egdsXdweKjNomkqTwM68TE",
  authDomain: "ps3-dynamic-tickets.firebaseapp.com",
  projectId: "ps3-dynamic-tickets",
  storageBucket: "ps3-dynamic-tickets.firebasestorage.app",
  messagingSenderId: "505141256489",
  appId: "1:505141256489:web:127978bb022718fa69d738",
  measurementId: "G-S8RFTPCM8G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
