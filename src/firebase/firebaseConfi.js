import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore, updateDoc} from 'firebase/firestore';
import {collection,
        doc,
        setDoc,
        deleteDoc
        } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRABASE_APIKEY,
  authDomain: process.env.REACT_APP_FIRABASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIRABASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIRABASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIRABASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIRABASE_APPID,
  measurementId: process.env.REACT_APP_FIRABASE_MEASUREMENTID,
  databaseURL: process.env.REACT_APP_FIRABASE_DATABASEURL
};

//fundamental firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
