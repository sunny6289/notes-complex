// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATrZ7MA-2oNlT-jdVjnba73ncGgk0s0gc",
  authDomain: "note-0707.firebaseapp.com",
  projectId: "note-0707",
  storageBucket: "note-0707.firebasestorage.app",
  messagingSenderId: "187108158909",
  appId: "1:187108158909:web:c78ff53be42c0dd60fb6d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 