import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail } from "firebase/auth";
import { AddToDB, auth, db, deleteFromDB, tempAuth, updateDB} from "../firebaseConfi";
import {collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc,
  updateDoc
  } from 'firebase/firestore';

const adminCollectionRef= collection(db,"admins")

//Create
export async function CreateAdmin (email,password,name,lastName){
    await createUserWithEmailAndPassword(tempAuth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    await AddToDB(user.uid,user.email,name,lastName,'admins')
    console.log("parece q si")
  })
  .catch((error) => {
    console.error("Error al crear admin: "+error)
  });
  await auth.signOut()
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
export async function updateAdmin(uid,newName,newLastName,newEmail,formerEmail,password){
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
    await updateDB(newName,newLastName,newEmail,doc(adminCollectionRef,uid)).catch(
      error => {
        console.log("Error Actualizando la DB: "+error)
        return false
      }
    )

    return tempAuth.currentUser == null && success ? true : false    
}

//Delete
export async function deleteAdmin (id,email,password){
  
  //Borra de DB
  await deleteFromDB(doc(adminCollectionRef, id)).catch(error => {
    console.error("Error al borrar de DB")
    return false
  })
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
 
    return tempAuth.currentUser == null && success ? true : false
}
