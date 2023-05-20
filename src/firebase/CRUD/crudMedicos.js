import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateEmail } from "firebase/auth";
import { AddToDB, auth, db, deleteFromDB, storage, tempAuth, updateDB } from "../firebaseConfi";
import {collection,
    doc,
    getDocs,
    query,
    where
    } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const doctorCollectionRef= collection(db,"medicos")

//Create
export async function CreateDoctor(email,password,name,lastName,supEmail,supPassword){
  let success = false
  
  await createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    success = true
    await AddToDB(user.uid,user.email,name,lastName,'medicos')//agregar el Medico a firestore
  })
  .catch((error) => {
    console.error("Error al crear Medico: "+error)//Alertar de error al crear el usuario
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
export async function updateDoctor(uid,newName,newLastName,newEmail,formerEmail,password,supPassword){
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
    await updateDB(newName,newLastName,newEmail,doc(doctorCollectionRef,uid)).catch(
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

//Delete
export async function deleteDoctor (id,affEmail,affPassword,supPassword){
  let success = false//var auxiliar para checar cada parte del proceso
  let supEmail = auth.currentUser.email//super usuario que hara la accion

  //Primero cambiar a la sesion del ususario afectado
  await signInWithEmailAndPassword(tempAuth,affEmail, affPassword)
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

  //Borrar al usuario afectado de la DB
  await deleteFromDB(doc(doctorCollectionRef, id)).catch(error => {
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
  await deleteDoctorProfilePic(id)

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

//Upload files
//Upload Profile Picture
export async function setDoctorProfilePic(uid,file) {
  try {
    const imageRef = ref(storage, `fotos-doctores/${uid}`)
    const resUpload = await uploadBytes(imageRef,file)
    return resUpload 
  } catch (error) {
    console.error("Error al subir archivo: "+error)
  }
}

//Get profile Picture
export async function getDoctorProfilePic(uid) {
  try {
    const imgRef = ref(storage, `fotos-doctores/${uid}`)
    const url = await getDownloadURL(imgRef)
    return url
  } catch (error) {
    console.error("Error al obtener la imagen de perfil: "+error)
  }
}

//Delete Profile pic
async function deleteDoctorProfilePic(uid) {
  let success = false
  const imageRef = ref(storage, `fotos-doctores/${uid}`)
  await deleteObject(imageRef).then(()=>{
    success = true
  }).catch(e => console.error("Error al borrar archivo de firestore: "+e))  

  return success
}

