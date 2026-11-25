
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "digiseller-9c8ee.firebaseapp.com",
  projectId: "digiseller-9c8ee",
  storageBucket: "digiseller-9c8ee.firebasestorage.app",
  messagingSenderId: "656518419612",
  appId: "1:656518419612:web:4525cd47eb43ab546b4959",
  measurementId: "G-Y6DJ9GEZDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider};
