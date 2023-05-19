import {collection,
        doc,
        getDocs,
        query,
        setDoc,
        updateDoc,
        where
        } from 'firebase/firestore';

import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateEmail } from 'firebase/auth'
import { auth, db, deleteFromDB, storage, tempAuth } from '../firebaseConfi';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const patientsCollectionRef= collection(db,"pacientes")


//Create
export async function CreatePatient(email,password,name,lastName,supEmail,supPassword){
  let success = false

  await createUserWithEmailAndPassword(auth, email, password)
.then(async (userCredential) => {
  // Signed in 
  const user = userCredential.user;
  success = true
  await AddToDBPatient(user.uid,user.email,name,lastName,'pacientes',"inactivo")
})
.catch((error) => {
  console.error("Error al crear Paciente: "+error)
  success = false
  return false
})

//Si la operacion anterior salio mal detener ejecucion
if (!success) {
  console.log("Algo salio mal al momento de crear al usuario afectado, se detiene el proceso")
  return false
}

//Reloguear al super usuario(admin o doc)
await signInWithEmailAndPassword(auth,supEmail, supPassword)
.then(function(userCredential) {
    console.log("el SupUser se logueo correctamente")
}).catch(async(error) => {//Error al loguear al super usuario
  console.error("Error al iniciar sesion temp: "+error)
  
  success = false//setear success en falso para alertar el problema, aunque igual se va a cerrar la sesion

  await signOut(tempAuth).then(() => {
    console.log("TempAuth cerro sesion")
  }).catch((error) => {
    console.error("Error al cerrar sesion de TempAuth: "+error)
  })
})

return tempAuth.currentUser != null && success ? true : false

}

async function AddToDBPatient (uid,email,nombre,apellido,table,status){
  const collectionRef = collection(db, table)
  const docRef = doc(collectionRef,uid)
  try {
    await setDoc(docRef, {id:uid,email:email, nombre:nombre, apellido:apellido,status:status})  
  } catch (error) {
    console.error("Error al agregar a base de datos "+table+": "+ error)
  }
}

//Read
export async function getAllPatients(){
  
  try {
    const allPatients = []
    const data = await getDocs(patientsCollectionRef)
  
    data.forEach(doc => {
      allPatients.push(doc.data())
    })
    
    return allPatients

  } catch (error) {
    console.error("Error al obtener todos los pacientes: "+error)
  }
  
}


export async function getAPatient(uid){
  
  try {
    const patient = []
    const queryGetPatients = query(patientsCollectionRef, where('id','==',uid));
    const data = await getDocs(queryGetPatients)
  
    data.forEach(doc => {
      patient.push(doc.data())
    })
    
    return patient

  } catch (error) {
    console.error("Error al obtener un paciente: "+error)
  }
  
}

//Update
export async function updatePatient(uid,newName,newLastName,newEmail,formerEmail,password,status){
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
    await updateDBPatient(newName,newLastName,newEmail,doc(patientsCollectionRef,uid),status).catch(
      error => {
        console.log("Error Actualizando la DB: "+error)
        return false
      }
    )

    return tempAuth.currentUser == null && success ? true : false    
}

async function updateDBPatient(newName,newLastName, newEmail,docRef,status){
  try {
    const userRef = docRef
    await updateDoc(userRef,{
      nombre: newName,
      apellido: newLastName,
      email: newEmail,
      status: status
    })
  } catch (error) {
    console.log("Error actualizando la DB: "+error) 
  }
}

//Delete
export async function deletePatient(id,email,password){
  let success = true
  //Borra de DB
  await deleteFromDB(doc(patientsCollectionRef, id)).catch(error => {
    console.error("Error al borrar de DB")
    return false
  })
  
  //Borrar correo de autenticacion
  console.log("entra a la funcion: " + tempAuth.currentUser.email)
  await signInWithEmailAndPassword(tempAuth,email, password)
    .then(function(userCredential) {
        console.log("tempUser se logueo correctamente")
    }).catch(error => console.error("Error al iniciar sesion temp: "+error))
    console.log("borrare a: " + tempAuth.currentUser.email)
    await deleteUser(tempAuth.currentUser)
    .then(()=>{
      console.log("Borrado correctamente correo autenticacion")
      success = true
    })
    .catch(error => console.error("Error al cambiar Correo autenticacion: "+error))

    return tempAuth.currentUser == null && success ? true : false
}


//Upload files
//Upload Profile Picture
export async function setPatientProfilePic(uid,file) {
  try {
    const imageRef = ref(storage, `fotos-pacientes/${uid}`)
    const resUpload = await uploadBytes(imageRef,file)
    return resUpload 
  } catch (error) {
    console.error("Error al subir archivo: "+error)
  }
}

//Get profile Picture
export async function getPatientProfilePic(uid) {
  try {
    const imgRef = ref(storage, `fotos-pacientes/${uid}`)
    const url = await getDownloadURL(imgRef)
    return url
  } catch (error) {
    console.error("Error al obtener la imagen de perfil: "+error)
  }
}
