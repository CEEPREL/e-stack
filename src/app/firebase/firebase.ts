// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnq-wpKs4pYTRRP6wALyAOD5y-9XC-bO0",
  authDomain: "pricious-store-7fc14.firebaseapp.com",
  projectId: "pricious-store-7fc14",
  storageBucket: "pricious-store-7fc14.firebasestorage.app",
  messagingSenderId: "440695046088",
  appId: "1:440695046088:web:fe843ebd01238e865b0afd",
  measurementId: "G-8PHH0TMD6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
