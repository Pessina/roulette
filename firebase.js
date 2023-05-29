import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKKS5SyNuHYWqF3x3iTALQ0qvppLLVbn0",
  authDomain: "roleta-escalada.firebaseapp.com",
  projectId: "roleta-escalada",
  storageBucket: "roleta-escalada.appspot.com",
  messagingSenderId: "695104084228",
  appId: "1:695104084228:web:99f94d5e804693ec8f1851",
  measurementId: "G-ETZL1T3XJR",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
