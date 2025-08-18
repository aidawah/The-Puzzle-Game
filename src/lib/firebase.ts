// src/lib/firebase.ts
import { env } from '$env/dynamic/public';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  // connectFirestoreEmulator,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  type DocumentData,
  type QueryDocumentSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  // connectAuthEmulator,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';

// ─── 1) Load config from .env ─────────────────────────────────────────────────
// Create a `.env` (or `.env.local`) in your project root with:
//
// VITE_FIREBASE_API_KEY=yourApiKey
// VITE_FIREBASE_AUTH_DOMAIN=yourAuthDomain
// VITE_FIREBASE_PROJECT_ID=yourProjectId
//
// (you can also include messagingSenderId, appId, etc, if you use them)
const firebaseConfig = {
  apiKey: env.PUBLIC_VITE_FIREBASE_API_KEY,
  authDomain: env.PUBLIC_VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.PUBLIC_VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.PUBLIC_VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.PUBLIC_VITE_FIREBASE_APP_ID,
  measurementId: env.PUBLIC_VITE_FIREBASE_MEASUREMENT_ID,
};


// const firebaseConfig = {
//   apiKey: "AIzaSyD09hdT1SPMIG4c2pJ5eD3yUgOk_ufvFCE",
//   authDomain: "puzzlegame-81846.firebaseapp.com",
//   projectId: "puzzlegame-81846",
//   storageBucket: "puzzlegame-81846.firebasestorage.app",
//   messagingSenderId: "618777530541",
//   appId: "1:618777530541:web:67616b7373b13e2a573624",
//   measurementId: "G-P0DH3M4KWX"
// };


// ─── 2) Initialize App ────────────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);

// ─── 3) Firestore ─────────────────────────────────────────────────────────────
export const db = getFirestore(app);

// if (import.meta.env.DEV) {
//   // point at emulator when running locally
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

// ─── 4) Auth ──────────────────────────────────────────────────────────────────
export const auth = getAuth(app);

// if (import.meta.env.DEV) {
//   // point at emulator when running locally
  // connectAuthEmulator(auth, 'http://localhost:9099');
// }

// ─── 5) Providers & helpers ──────────────────────────────────────────────────
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}
export function signInWithApple() {
  return signInWithPopup(auth, appleProvider);
}
export function signOut() {
  return firebaseSignOut(auth);
}
export function onUserChanged(cb: (u: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

// ─── 6) Puzzle types & helpers ───────────────────────────────────────────────
export interface Puzzle {
  id: string;
  title: string;
  author: string;
  groups: { answers: string[]; description: string }[];
  createdBy?: string;
}

export async function fetchPuzzles(): Promise<Puzzle[]> {
  const snap = await getDocs(collection(db, 'puzzles'));
  return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
    id: d.id,
    ...(d.data() as Omit<Puzzle, 'id'>)
  }));
}

export async function createPuzzle(p: Omit<Puzzle, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'puzzles'), {
    ...p,
    createdBy: auth.currentUser?.uid || null
  });
  return ref.id;
}

export async function fetchMyPuzzles(): Promise<Puzzle[]> {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];
  const q = query(collection(db, 'puzzles'), where('createdBy', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
    id: d.id,
    ...(d.data() as Omit<Puzzle, 'id'>)
  }));
}
