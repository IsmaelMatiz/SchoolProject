import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  getBytes
} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

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

