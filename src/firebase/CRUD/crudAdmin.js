import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { AddToDB, auth, db, deleteFromDB, storage, tempAuth, updateDB} from "../firebaseConfi";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const adminCollectionRef= collection(db,"admins")

//Create
export async function CreateAdmin (email,password,name,lastName,supEmail,supPassword){
  let success = false

  await createUserWithEmailAndPassword(tempAuth, email, password)
  .then(async(userCredential) => {
    // Creado exitosamente el admin
    const user = userCredential.user;
    await AddToDB(user.uid,user.email,name,lastName,'admins')//agregar el admin a firestore
    success = true
    console.log("Creado Exitosamente")
  })
  .catch((error) => {
    console.error("Error al crear admin: "+error) //Alertar de error al crear el usuario
    success = false
    return false
  });

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
export async function updateAdmin(uid,newName,newLastName,newEmail,formerEmail,password,supPassword){
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
    await updateDB(newName,newLastName,newEmail,doc(adminCollectionRef,uid)).catch(
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
export async function deleteAdmin (id,affEmail,affPassword,supPassword){
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
  await deleteFromDB(doc(adminCollectionRef, id)).catch(error => {
    console.error("Error al borrar de DB")
    success = false
    return false
  })

  //Si la operacion anterior salio mal detener ejecucion
  if (!success) {
    console.log("Algo salio mal al momento de borrar de la DB al usuario, se detiene el proceso")
    return false
  }

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
export async function setAdminProfilePic(uid,file) {
  try {
    const imageRef = ref(storage, `fotos-admins/${uid}`)
    const resUpload = await uploadBytes(imageRef,file)
    return resUpload 
  } catch (error) {
    console.error("Error al subir archivo: "+error)
  }
}

//Get profile Picture
export async function getAdminProfilePic(uid) {
  try {
    const imgRef = ref(storage, `fotos-admins/${uid}`)
    const url = await getDownloadURL(imgRef)
    return url
  } catch (error) {
    console.error("Error al obtener la imagen de perfil: "+error)
  }
}


//Cambiar Password
//esta funcion es global, pero por facilidad del tempAuth la decidi poner aqui
export async function ChangePassword(email,prevPassword,newPassword) {
  //Borrar correo de autenticacion
  let success = false
  await signInWithEmailAndPassword(tempAuth,email, prevPassword)
    .then(function(userCredential) {
        console.log("tempUser se logueo correctamente")
    }).catch(error => {
      console.error("Error al iniciar sesion temp: "+error)
      return false
    })

    await updatePassword(tempAuth.currentUser, newPassword).then(()=> {
      //Todo salio bien
      success = true
    }).catch(error => console.error("Error al actualizar la password: "+error))
    
    await signOut(tempAuth).then(() => {
      console.log("TempAuth cerro sesion")
    }).catch((error) => {
      console.error("Error al cerrar sesion de TempAuth: "+error)
    })

    return tempAuth.currentUser == null && success ? true : false
}
