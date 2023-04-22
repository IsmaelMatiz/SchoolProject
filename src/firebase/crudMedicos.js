import { createUserWithEmailAndPassword } from "firebase/auth";
import { AddToDB, auth, db } from "./firebaseConfi";
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

const doctorCollectionRef= collection(db,"medicos")

//Create
export async function CreateDoctor(email,password,name,lastName){
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    AddToDB(user.uid,user.email,name,lastName,'medicos')
  })
  .catch((error) => {
    console.error("Error al crear Medico: "+error)
  });
}
  
//Read
export async function getAllDoctors(){
  
    try {
      const allDoctors = []
      const data = await getDocs(doctorCollectionRef)
    
      data.forEach(doc => {
        allDoctors.push(doc.data())
      })
      
      return allDoctors
  
    } catch (error) {
      console.error("Error al obtener todos los Medicos: "+error)
    }
    
}

export async function getADoctor(uid){
  
    try {
      const medico = []
      const queryGetDocs = query(doctorCollectionRef, where('id','==',uid));
      const data = await getDocs(queryGetDocs)
    
      data.forEach(doc => {
        medico.push(doc.data())
      })
      
      return medico
  
    } catch (error) {
      console.error("Error al obtener un medico: "+error)
    }
    
  }

//update
//Delete