// src/lib/firebase.ts
// import { env } from '$env/dynamic/public';
import {
  PUBLIC_FIREBASE_API_KEY,
  PUBLIC_FIREBASE_AUTH_DOMAIN,
  PUBLIC_FIREBASE_PROJECT_ID,
  PUBLIC_FIREBASE_STORAGE_BUCKET,
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  PUBLIC_FIREBASE_APP_ID,
  PUBLIC_FIREBASE_MEASUREMENT_ID
} from '$env/static/public';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  // connectFirestoreEmulator,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  serverTimestamp,
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

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID,
  measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey) throw new Error('Missing PUBLIC_FIREBASE_API_KEY');

// ─── 2) Initialize App ────────────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);

// ─── 3) Firestore ─────────────────────────────────────────────────────────────
export const db = getFirestore(app);

// if (import.meta.env.DEV) {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

// ─── 4) Auth ──────────────────────────────────────────────────────────────────
export const auth = getAuth(app);

// if (import.meta.env.DEV) {
//   connectAuthEmulator(auth, 'http://localhost:9099');
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

// ─── 6b) Progress types & helpers ────────────────────────────────────────────
export type PuzzleProgress = {
  tileOrder: string[];   // current board order by word
  solvedOrder: number[]; // group indexes solved (0..3) in order
  selected: string[];    // currently selected words (<=4)
  updatedAt?: unknown;   // serverTimestamp()
};

function progressRef(puzzleId: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;
  return doc(db, 'users', uid, 'progress', puzzleId);
}

export async function loadProgress(puzzleId: string): Promise<PuzzleProgress | null> {
  const ref = progressRef(puzzleId);
  if (!ref) return null;
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as PuzzleProgress) : null;
}

export async function saveProgress(
  puzzleId: string,
  p: Omit<PuzzleProgress, 'updatedAt'>
) {
  const ref = progressRef(puzzleId);
  if (!ref) return;
  await setDoc(ref, { ...p, updatedAt: serverTimestamp() }, { merge: true });
}

export async function clearProgress(puzzleId: string) {
  const ref = progressRef(puzzleId);
  if (!ref) return;
  await deleteDoc(ref);
}
