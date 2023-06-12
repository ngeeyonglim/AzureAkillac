import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBNuC2X7VpTf7Zk-FiPioybLabg-2etHyI",
  authDomain: "akillac-f1499.firebaseapp.com",
  projectId: "akillac-f1499",
  storageBucket: "akillac-f1499.appspot.com",
  messagingSenderId: "580944453001",
  appId: "1:580944453001:web:3604c244f3a7cae38f1558",
  measurementId: "G-TY631VCJHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export async function updateProfile(uid, data) {
  await setDoc(doc(firestore, "profileData", uid), data, { merge: true });
}

export async function createProfile(uid, data) {
  await setDoc(doc(firestore, "profileData", uid), data);
}

export async function getProfile(uid) {
  if (!uid) return null;
  const profile = await getDoc(doc(firestore, "profileData", uid));
  return profile.data();
}