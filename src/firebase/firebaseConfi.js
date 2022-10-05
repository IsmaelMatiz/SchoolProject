import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebaseApp);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

export {auth, firebaseConfig,database,storage } ;
export default firebaseApp;
