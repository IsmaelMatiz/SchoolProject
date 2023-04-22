import { createUserWithEmailAndPassword } from "firebase/auth";
import { AddToDB, auth, db} from "./firebaseConfi";
import {collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc
  } from 'firebase/firestore';

const adminCollectionRef= collection(db,"admins")

//Create
export async function CreateAdmin (email,password,name,lastName){
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    AddToDB(user.uid,user.email,name,lastName,'admins')
  })
  .catch((error) => {
    console.error("Error al crear admin: "+error)
  });
  }


//Read
export async function getAllAdmins(){
  
  try {
    const allAdmins = []
    const data = await getDocs(adminCollectionRef)
  
    data.forEach(doc => {
      allAdmins.push(doc.data())
    })
    
    return allAdmins

  } catch (error) {
    console.error("Error al obtener todos los admins: "+error)
  }
  
}

export async function getAdmin(uid){
  
  try {
    const admin = []
    const queryGetAdmin = query(adminCollectionRef, where('id','==',uid));
    const data = await getDocs(queryGetAdmin)
  
    data.forEach(doc => {
      admin.push(doc.data())
    })
    
    return admin

  } catch (error) {
    console.error("Error al obtener un admin: "+error)
  }
  
}

//Update
//Delete