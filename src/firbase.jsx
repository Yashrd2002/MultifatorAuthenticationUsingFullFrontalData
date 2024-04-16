// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJCVMdFw6ChC3LQWhqSTWWRTkEOhQYRVw",
    authDomain: "project-825f0.firebaseapp.com",
    projectId: "project-825f0",
    storageBucket: "project-825f0.appspot.com",
    messagingSenderId: "590806566042",
    appId: "1:590806566042:web:fffa638cb2f2c1b2c08b23",
    measurementId: "G-QF88NLFM0K"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


