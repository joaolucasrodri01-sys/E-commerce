import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0jDSr1bet_kmvaHANqUJQMg1h-MHsSLs",
  authDomain: "e-commerce-1338f.firebaseapp.com",
  projectId: "e-commerce-1338f",
  storageBucket: "e-commerce-1338f.firebasestorage.app",
  messagingSenderId: "563327599912",
  appId: "1:563327599912:web:8ce4a79da018c8a24bfc1d"
};

// Inicializa o app apenas uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta o banco de dados
export const db = getFirestore(app);