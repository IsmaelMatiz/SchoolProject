import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateEmail } from "firebase/auth";
import { AddToDB, auth, db, deleteFromDB, tempAuth, updateDB } from "../firebaseConfi";
import {collection,
    doc,
    getDocs,
    query,
    where
    } from 'firebase/firestore';

const doctorCollectionRef= collection(db,"medicos")

//Create
export async function CreateDoctor(email,password,name,lastName){
    await createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    await AddToDB(user.uid,user.email,name,lastName,'medicos')
  })
  .catch((error) => {
    console.error("Error al crear Medico: "+error)
  })
  await auth.signOut()
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
export async function updateDoctor(uid,newName,newLastName,newEmail,formerEmail,password){
  //actualizar correo de autenticacion
  let success = false
  await signInWithEmailAndPassword(tempAuth,formerEmail, password)
    .then(function(userCredential) {
        console.log("tempUser se logueo correctamente")
    }).catch(error => console.error("Error al iniciar sesion temp: "+error))

    await updateEmail(tempAuth.currentUser, newEmail)
    .then(()=>{
      console.log("Actualizado correctamente correo autenticacion")
      success = true
    })
    .catch(error => console.error("Error al cambiar Correo autenticacion: "+error))

    await signOut(tempAuth).then(() => {
      console.log("TempAuth cerro sesion")
    }).catch((error) => {
      console.error("Error al cerrar sesion de TempAuth: "+error)
    });
    //Actualizar DB
    updateDB(newName,newLastName,newEmail,doc(doctorCollectionRef,uid)).catch(
      error => {
        console.log("Error Actualizando la DB: "+error)
        return false
      }
    )

    return tempAuth.currentUser == null && success ? true : false    
}

//Delete
export async function deleteDoctor (id,email,password){
  //Borrar correo de autenticacion
  let success = false
  await signInWithEmailAndPassword(tempAuth,email, password)
    .then(function(userCredential) {
        console.log("tempUser se logueo correctamente")
    }).catch(error => console.error("Error al iniciar sesion temp: "+error))

    await deleteUser(tempAuth.currentUser)
    .then(()=>{
      console.log("Borrado correctamente correo autenticacion")
      success = true
    })
    .catch(error => console.error("Error al cambiar Correo autenticacion: "+error))

    await signOut(tempAuth).then(() => {
      console.log("TempAuth cerro sesion")
    }).catch((error) => {
      console.error("Error al cerrar sesion de TempAuth: "+error)
    });

    //Borra de DB
    deleteFromDB(doc(doctorCollectionRef, id)).catch(error => {
      console.error("Error al borrar de DB")
      return false
    })
 
    return tempAuth.currentUser == null && success ? true : false
}