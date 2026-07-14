// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu52kf3dZbQ-KwhkWFQznuzOa-9j22VQE",
  authDomain: "chat-app-ade65.firebaseapp.com",
  projectId: "chat-app-ade65",
  storageBucket: "chat-app-ade65.firebasestorage.app",
  messagingSenderId: "513462363576",
  appId: "1:513462363576:web:f842cc3265564d51259b4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);