/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyBKatrq8fFiZbKfPUBNn6gGuWKpg68iV3A",
    authDomain: "journal-app-1f88a.firebaseapp.com",
    projectId: "journal-app-1f88a",
    storageBucket: "journal-app-1f88a.appspot.com",
    messagingSenderId: "1066292980237",
    appId: "1:1066292980237:web:5ef2ea62e657712ca0c344"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);