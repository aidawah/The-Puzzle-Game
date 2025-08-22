import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, OAuthProvider, onAuthStateChanged } from "firebase/auth";
const PUBLIC_FIREBASE_API_KEY = "AIzaSyD09hdT1SPMIG4c2pJ5eD3yUgOk_ufvFCE";
const PUBLIC_FIREBASE_AUTH_DOMAIN = "puzzlegame-81846.firebaseapp.com";
const PUBLIC_FIREBASE_PROJECT_ID = "puzzlegame-81846";
const PUBLIC_FIREBASE_STORAGE_BUCKET = "puzzlegame-81846.firebasestorage.app";
const PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "618777530541";
const PUBLIC_FIREBASE_APP_ID = "1:618777530541:web:67616b7373b13e2a573624";
const PUBLIC_FIREBASE_MEASUREMENT_ID = "G-P0DH3M4KWX";
const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID,
  measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};
if (!firebaseConfig.apiKey) throw new Error("Missing PUBLIC_FIREBASE_API_KEY");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
new GoogleAuthProvider();
new OAuthProvider("apple.com");
function onUserChanged(cb) {
  return onAuthStateChanged(auth, cb);
}
async function fetchPuzzles() {
  const snap = await getDocs(collection(db, "puzzles"));
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));
}
async function fetchMyPuzzles() {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];
  const q = query(collection(db, "puzzles"), where("createdBy", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));
}
export {
  fetchMyPuzzles as a,
  db as d,
  fetchPuzzles as f,
  onUserChanged as o
};
