// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

var apiKey = process.env.API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: "expenser-app-81dd6.firebaseapp.com",
  projectId: "expenser-app-81dd6",
  storageBucket: "expenser-app-81dd6.appspot.com",
  messagingSenderId: "325825896059",
  appId: "1:325825896059:web:8df817f86bde28eb9e4cde",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
