// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeuD71hgpyQMZ-64087xnp53lPQ-Nx-4M",
  authDomain: "messagingapp-c5160.firebaseapp.com",
  projectId: "messagingapp-c5160",
  storageBucket: "messagingapp-c5160.appspot.com",
  messagingSenderId: "254975502513",
  appId: "1:254975502513:web:ea424095ad440c2c98da90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
