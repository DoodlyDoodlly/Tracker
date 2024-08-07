// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyA_ZGeqyoJIoL8XjDSX_MXpD8FmDPQ0Ao4",
 authDomain: "inventory-management-9b555.firebaseapp.com",
 projectId: "inventory-management-9b555",
 storageBucket: "inventory-management-9b555.appspot.com",
 messagingSenderId: "629466807402",
 appId: "1:629466807402:web:e0e3e205038787c311de13",
 measurementId: "G-SLDVEL7Y4J"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore= getFirestore(app);


export {firestore}