// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

//register new user

export const registerNewUser = async (auth, email, password, name) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: '#',
    });
  } catch (error) {
    console.log(error);
    console.log(error.code);
  }
};

// sign in user

export const signInUser = async (auth, email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then((response) => {
      const user = response.user;
      console.log('~~user logged in~~');
      // console.log('user info:', user);
      // sessionStorage.setItem(
      //   'Auth Token',
      //   response._tokenResponse.refreshToken
      // );
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  }
};

export const logOut = () => {
  signOut(auth);
};

export const updateUserData = (auth, e) => {};

export const writeUserData = async () => {};
