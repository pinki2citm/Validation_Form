// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkXg0n-Uyok7qMNWJvSNPemLkhoYfTCng",
  authDomain: "e-learn-718b7.firebaseapp.com",
  projectId: "e-learn-718b7",
  storageBucket: "e-learn-718b7.appspot.com",
  messagingSenderId: "772867888462",
  appId: "1:772867888462:web:7809fb6378c5f937ff7a1f",
  measurementId: "G-88L9GED5H8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();