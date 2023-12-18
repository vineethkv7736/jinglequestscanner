// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9Cy3su5Evl5FhQmsAoZsrZD7tfinC-wo",
  authDomain: "jinglequest-cdc1c.firebaseapp.com",
  projectId: "jinglequest-cdc1c",
  storageBucket: "jinglequest-cdc1c.appspot.com",
  messagingSenderId: "1089450906826",
  appId: "1:1089450906826:web:c3e0be2fa238ca4f51d033"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()
export {db,auth}
