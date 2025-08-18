import { p as public_env } from "./shared-server.js";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, OAuthProvider, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: public_env.PUBLIC_FIREBASE_API_KEY,
  authDomain: public_env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: public_env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: public_env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: public_env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: public_env.PUBLIC_FIREBASE_APP_ID,
  measurementId: public_env.PUBLIC_FIREBASE_MEASUREMENT_ID
  // apiKey: "AIzaSyD09hdT1SPMIG4c2pJ5eD3yUgOk_ufvFCE",
  // authDomain: "puzzlegame-81846.firebaseapp.com",
  // projectId: "puzzlegame-81846",
  // storageBucket: "puzzlegame-81846.firebasestorage.app",
  // messagingSenderId: "618777530541",
  // appId: "1:618777530541:web:67616b7373b13e2a573624",
  // measurementId: "G-P0DH3M4KWX"
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
const firebaseConfigs = {
  apiKey: public_env.PUBLIC_FIREBASE_API_KEY,
  authDomain: public_env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: public_env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: public_env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: public_env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: public_env.PUBLIC_FIREBASE_APP_ID,
  measurementId: public_env.PUBLIC_FIREBASE_MEASUREMENT_ID
};
console.log("firebase config testing 1", firebaseConfigs);
export {
  fetchMyPuzzles as a,
  db as d,
  fetchPuzzles as f,
  onUserChanged as o
};
