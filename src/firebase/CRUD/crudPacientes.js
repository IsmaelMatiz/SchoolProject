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
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
export async function updatePatient(uid,newName,newLastName,newEmail,formerEmail,password,status,supPassword){
  let success = false//var auxiliar para checar cada parte del proceso
  let supEmail = auth.currentUser.email//super usuario que hara la accion

  //Primero cambiar a la sesion del ususario afectado
  await signInWithEmailAndPassword(tempAuth,formerEmail, password)
    .then(function(userCredential) {
        console.log("tempUser se logueo correctamente")
        success = true
      }).catch(error => {
        console.error("Error al iniciar sesion temp: "+error)
        success = false
        return false
      })

    //Si la operacion anterior salio mal detener ejecucion
    if (!success) {
      console.log("Algo salio mal al momento de loguear al usuario afectado, se detiene el borrado")
      return false
    }

    //Editar email al usuario afectado
    await updateEmail(tempAuth.currentUser, newEmail)
    .then(()=>{
      console.log("Actualizado correctamente correo autenticacion")
      success = true
    })
    .catch(error => {
      console.error("Error al cambiar Correo autenticacion: "+error)
      success = false
    })

    //Si la operacion anterior salio mal detener ejecucion
    if (!success) {
      console.log("Algo salio mal al momento de loguear al usuario afectado, se detiene el borrado")
      return false
    }

    //Actualizar DB
    await updateDBPatient(newName,newLastName,newEmail,doc(patientsCollectionRef,uid),status).catch(
      error => {
        console.log("Error Actualizando la DB: "+error)
        success = false
        return false
      }
    )

    //Si la operacion anterior salio mal detener ejecucion
    if (!success) {
      console.log("Algo salio mal al momento de loguear al usuario afectado, se detiene el borrado")
      return false
    }

    /*
    * Si el super usuario se edita asi mismo, no podra loguearse con la info del email anterior
    * asi que aqui aqui validamos eso y en caso de ser asi intentamos loguearnos con el nuevo email
    */
   if (supEmail == formerEmail) {//si esto se cumple quiere decir que el super user se edito a si mismo
    
    //Volver a loguear al super usuario cuando se edito a si mismo
    await signInWithEmailAndPassword(auth,newEmail, supPassword)
    .then(function(userCredential) {
        console.log("el SupUser se logueo correctamente")
        success = true
    }).catch(async(error) => {
      //si no es posible loguear de nuevo al super usuario cerrar la sesion
      console.error("Error al iniciar sesion temp: "+error)
      
      await signOut(tempAuth).then(() => {
        console.log("TempAuth cerro sesion")
      }).catch((error) => {
        console.error("Error al cerrar sesion de TempAuth: "+error)
      })
    })

   } else {//por el contrario edito a otro usuario
    
    //Volver a loguear al super usuario cuando edito a otro usuario
    await signInWithEmailAndPassword(auth,supEmail, supPassword)
    .then(function(userCredential) {
        console.log("el SupUser se logueo correctamente")
        success = true
    }).catch(async(error) => {
      //si no es posible loguear de nuevo al super usuario cerrar la sesion
      console.error("Error al iniciar sesion temp: "+error)
      
      await signOut(tempAuth).then(() => {
        console.log("TempAuth cerro sesion")
      }).catch((error) => {
        console.error("Error al cerrar sesion de TempAuth: "+error)
      })
    })
   }
    
    //Finalmente si todo sale bien informarlo
    return tempAuth.currentUser != null && success ? true : false
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
export async function deletePatient(id,email,password,supPassword){
  let success = false//var auxiliar para checar cada parte del proceso
  let supEmail = auth.currentUser.email//super usuario que hara la accion
  
  //Primero cambiar a la sesion del ususario afectado
  await signInWithEmailAndPassword(tempAuth,email, password)
    .then(function(userCredential) {
      console.log("tempUser se logueo correctamente")
      success = true
    }).catch(error => {
      console.error("Error al iniciar sesion temp: "+error)
      success = false
      return false
    })

    //Si la operacion anterior salio mal detener ejecucion
    if (!success) {
      console.log("Algo salio mal al momento de loguear al usuario afectado, se detiene el borrado")
      return false
    }
    
    //Borrar al usuario afectado
    await deleteUser(tempAuth.currentUser)
    .then(()=>{
      console.log("Borrado correctamente correo autenticacion")
      success = true
    })
    .catch(error => {
      console.error("Error al Borrar Correo de autenticacion: "+error)
      success = false
      return false
  })

  //Si la operacion anterior salio mal detener ejecucion
  if (!success) {
    console.log("Algo salio mal al momento de borrar el correro de auth del usuario afectado, se detiene el proceso")
    return false
  }

    //Borra de DB
  await deleteFromDB(doc(patientsCollectionRef, id)).catch(error => {
    console.error("Error al borrar de DB")
    success = false
    return false
  })

  //Si la operacion anterior salio mal detener ejecucion
  if (!success) {
    console.log("Algo salio mal al momento de borrar de la DB al usuario, se detiene el proceso")
    return false
  }

  //Si hay foto de perfil borrala
  await deletePatientProfilePic(id)

  //Volver a loguear al super usuario
  await signInWithEmailAndPassword(auth,supEmail, supPassword)
  .then(function(userCredential) {
      console.log("el SupUser se logueo correctamente")
      success = true
  }).catch(async(error) => {
    //si no es posible loguear de nuevo al super usuario cerrar la sesion
    console.error("Error al iniciar sesion temp: "+error)
    
    await signOut(tempAuth).then(() => {
      console.log("TempAuth cerro sesion")
    }).catch((error) => {
      console.error("Error al cerrar sesion de TempAuth: "+error)
    })
  })

    //Finalmente si todo sale bien informarlo
    return tempAuth.currentUser != null && success ? true : false
}


//Upload Profile Pics
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

//Delete Profile pic
async function deletePatientProfilePic(uid) {
  let success = false
  const imageRef = ref(storage, `fotos-pacientes/${uid}`)
  await deleteObject(imageRef).then(()=>{
    success = true
  }).catch(e => console.error("Error al borrar archivo de firestore: "+e))
  
  return success
}

//Upload PDF Historia Clinica
//Upload PDF
export async function setPatientClinicHistory(uid,file) {
    let success = false
    const imageRef = ref(storage, `historias-clinicas/${uid}`)
    const resUpload = await uploadBytes(imageRef,file).then(()=>{
      success = true
    }).catch(e => console.error("Error al subir pdf de historia a firebase: "+ e))
    return success
}

//Get the pdf
export async function getPatientClinicHistory(uid) {
  try {
    const pdfRef = ref(storage, `historias-clinicas/${uid}`)
    const url = await getDownloadURL(pdfRef)
    return url
  } catch (error) {
    console.error("Error al obtener la imagen de perfil: "+error)
    return "no"
  }
}
