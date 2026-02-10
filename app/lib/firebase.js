// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp9dUbbqCoT2546xQZJ-tvqP5_MIUeve4",
  authDomain: "finnalmilestone-project.firebaseapp.com",
  projectId: "finnalmilestone-project",
  storageBucket: "finnalmilestone-project.firebasestorage.app",
  messagingSenderId: "971265872582",
  appId: "1:971265872582:web:9911d825c31e7b47637dc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);