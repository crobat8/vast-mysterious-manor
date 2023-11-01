// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcoMCEBzEXMnzW3nxsN_RxFmkKIbciNBw",
  authDomain: "vast-mysterious-manor-online.firebaseapp.com",
  databaseURL: "https://vast-mysterious-manor-online-default-rtdb.firebaseio.com",
  projectId: "vast-mysterious-manor-online",
  storageBucket: "vast-mysterious-manor-online.appspot.com",
  messagingSenderId: "317445285686",
  appId: "1:317445285686:web:c3d1a685b1561964e33597",
  measurementId: "G-YHMNCNEVCB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
