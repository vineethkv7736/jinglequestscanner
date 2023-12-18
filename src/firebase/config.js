// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQAiKOHAYvnc2S4MFjZOuUMoz87utI0VQ",
  authDomain: "prcqrscanner.firebaseapp.com",
  projectId: "prcqrscanner",
  storageBucket: "prcqrscanner.appspot.com",
  messagingSenderId: "735419670435",
  appId: "1:735419670435:web:f68e3f8b37d216f5ea8416"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}