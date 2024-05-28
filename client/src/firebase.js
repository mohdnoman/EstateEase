// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "estateease-424410.firebaseapp.com",
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: "estateease-424410.appspot.com",
    messagingSenderId: "390284244056",
    appId: "1:390284244056:web:d2635f0f9ba8cda082862d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);