// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDePkQjG69zJO9NBM0MWCExaeZFAT2ZP2A",
  authDomain: "hama-5c6d8.firebaseapp.com",
  projectId: "hama-5c6d8",
  storageBucket: "hama-5c6d8.appspot.com",
  messagingSenderId: "223963671888",
  appId: "1:223963671888:web:c5a6417e225eb149201055",
  measurementId: "G-6PYZCTTFB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

