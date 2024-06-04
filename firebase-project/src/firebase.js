// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFR_hJeNgklBeqJ2EocKKdwxO8jK-5sOw",
  authDomain: "final-project-app-8c634.firebaseapp.com",
  projectId: "final-project-app-8c634",
  storageBucket: "final-project-app-8c634.appspot.com",
  messagingSenderId: "240281319826",
  appId: "1:240281319826:web:1d0ac01b7f5473a03ee94b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
