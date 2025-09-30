// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeg8oQlf3frUd8962t1t8pxzTCCq2SIBI",
  authDomain: "creative-it-hw.firebaseapp.com",
  databaseURL: "https://creative-it-hw-default-rtdb.firebaseio.com",
  projectId: "creative-it-hw",
  storageBucket: "creative-it-hw.firebasestorage.app",
  messagingSenderId: "851877978717",
  appId: "1:851877978717:web:6abb1da1a5fff43c9a63b4",
  measurementId: "G-C21FLZL2RP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;