// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your Firebase Config (PASTE FROM FIREBASE)
const firebaseConfig = {
  apiKey: "AIzaSyChBSMrKYqX3R5PiWVWgZz1N5OPGC1Aahw",
  authDomain: "zyphoratech-cfaa6.firebaseapp.com",
  projectId: "zyphoratech-cfaa6",
  storageBucket: "zyphoratech-cfaa6.firebasestorage.app",
  messagingSenderId: "882589126349",
  appId: "1:882589126349:web:e2c9e925be6e3b56d26384"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);