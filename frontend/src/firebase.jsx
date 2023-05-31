import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAF39Vzj-ro9MYAtvRkck0S403tdzu61Ag",
    authDomain: "netflix-3aa43.firebaseapp.com",
    projectId: "netflix-3aa43",
    storageBucket: "netflix-3aa43.appspot.com",
    messagingSenderId: "348066663041",
    appId: "1:348066663041:web:91c58177c110a8bf9fdb80",
    measurementId: "G-43NGQERWKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
