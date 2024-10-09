// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBPIcDX0Sxy5gPJPfjVdeZAULTZWzUNowU',
  authDomain: 'voting-platform-e9d90.firebaseapp.com',
  projectId: 'voting-platform-e9d90',
  storageBucket: 'voting-platform-e9d90.appspot.com',
  messagingSenderId: '59749545550',
  appId: '1:59749545550:web:a229196ab5452d660e751f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export default app;
