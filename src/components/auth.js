import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './Firebase';
export const docreateUserwithEmailandPw = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const dosignInwithEmailandPw = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const dosignInwithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = signInWithPopup(auth, provider);
  localStorage.setItem('user', JSON.stringify(result.user));
  return result;
};
export const doSignOut = async () => {
  return auth.signOut();
};
