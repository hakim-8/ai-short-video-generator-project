// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-generated-videos-ecfe1.firebaseapp.com",
  databaseURL: "https://ai-generated-videos-ecfe1-default-rtdb.firebaseio.com",
  projectId: "ai-generated-videos-ecfe1",
  storageBucket: "ai-generated-videos-ecfe1.firebasestorage.app",
  messagingSenderId: "443882414938",
  appId: "1:443882414938:web:5857e5dec81d983e4ac963",
  measurementId: "G-WENS93Z7CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)