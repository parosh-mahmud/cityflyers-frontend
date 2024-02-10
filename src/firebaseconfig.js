// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzrA2SnGQ03LkiuqXn8iFgS5EoyzAW0OE",
  authDomain: "city-flyers-7977d.firebaseapp.com",
  projectId: "city-flyers-7977d",
  storageBucket: "city-flyers-7977d.appspot.com",
  messagingSenderId: "581252307092",
  appId: "1:581252307092:web:5ecabd6208fa0803b73c81",
  measurementId: "G-1K0SQ7ERYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const useAuth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // You can return user data or handle it as needed
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

 const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return {
    signInWithGoogle,
    signOut,
    // ... (other authentication functions)
  };
};

export { useAuth,auth };