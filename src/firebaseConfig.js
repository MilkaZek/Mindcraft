import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCWD6ua0PEv7Bs1wiHVfywh67hXd7nw90w",
  authDomain: "mindcraft-43906.firebaseapp.com",
  projectId: "mindcraft-43906",
  storageBucket: "mindcraft-43906.firebasestorage.app",
  messagingSenderId: "480449380901",
  appId: "1:480449380901:web:8bb244f7ffbef444faf5cc"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)