import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI2zX0lwXc0UreVhhno37MmxAqHIr-UXo",
  authDomain: "roulette-779a0.firebaseapp.com",
  projectId: "roulette-779a0",
  storageBucket: "roulette-779a0.appspot.com",
  messagingSenderId: "444273899048",
  appId: "1:444273899048:web:d69ba6e3ce42898b9da71d",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
