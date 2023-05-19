import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateEmail } from "firebase/auth";
import { AddToDB, auth, db, deleteFromDB, storage, tempAuth, updateDB } from "../firebaseConfi";
import {collection,
    doc,
    getDocs,
    query,
    where
    } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    return false
  })
  
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
    await updateDB(newName,newLastName,newEmail,doc(doctorCollectionRef,uid)).catch(
      error => {
        console.log("Error Actualizando la DB: "+error)
        return false
      }
    )

    return tempAuth.currentUser == null && success ? true : false    
}

//Delete
export async function deleteDoctor (id,affEmail,affPassword,supPassword){
  //Borrar correo de autenticacion
  let success = false
  let supEmail = auth.currentUser.email

  await signInWithEmailAndPassword(tempAuth,affEmail, affPassword)
    .then(function(userCredential) {
        console.log("tempUser se logueo correctamente")
    }).catch(error => console.error("Error al iniciar sesion temp: "+error))

    await deleteUser(tempAuth.currentUser)
    .then(()=>{
      console.log("Borrado correctamente correo autenticacion")
      success = true
    })
    .catch(error => console.error("Error al cambiar Correo autenticacion: "+error))

    await signInWithEmailAndPassword(auth,supEmail, supPassword)
    .then(function(userCredential) {
        console.log("el SupUser se logueo correctamente")
    }).catch(async(error) => {
      console.error("Error al iniciar sesion temp: "+error)
      await signOut(tempAuth).then(() => {
        console.log("TempAuth cerro sesion")
      }).catch((error) => {
        console.error("Error al cerrar sesion de TempAuth: "+error)
      })
    })

    //Borra de DB
    deleteFromDB(doc(doctorCollectionRef, id)).catch(error => {
      console.error("Error al borrar de DB")
      return false
    })
 
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

