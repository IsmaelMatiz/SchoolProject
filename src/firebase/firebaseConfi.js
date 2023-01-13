import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


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
console.log(firebaseConfig)
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp)


export default firebaseApp;
