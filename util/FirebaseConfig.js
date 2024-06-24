// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "fyptest-c386f.firebaseapp.com",
  databaseURL:
    "https://fyptest-c386f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fyptest-c386f",
  storageBucket: "fyptest-c386f.appspot.com",
  messagingSenderId: "662781821020",
  appId: "1:662781821020:web:44199de73a2c46cb0f6699",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
