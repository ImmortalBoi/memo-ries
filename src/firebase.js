// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTCZXsTQBjobUlBQGrWLsp6x-c0yumG7k",
    authDomain: "memo-ries-cc96c.firebaseapp.com",
    databaseURL:
        "https://memo-ries-cc96c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "memo-ries-cc96c",
    storageBucket: "memo-ries-cc96c.appspot.com",
    messagingSenderId: "746585292256",
    appId: "1:746585292256:web:ae5cde5f4b95d27d6ebf85",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

export { firebaseApp, auth, db };
