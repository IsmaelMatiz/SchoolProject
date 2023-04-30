import {collection,
        doc,
        getDocs,
        query,
        setDoc,
        updateDoc,
        where
        } from 'firebase/firestore';

import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateEmail } from 'firebase/auth'
import { auth, db, deleteFromDB, tempAuth } from '../firebaseConfi';

const patientsCollectionRef= collection(db,"pacientes")

//TODO: Analizar pa q era esto XD
/*export function Rol(){
    // captura del rol del usuario
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const medicoDocRef = doc(firestore, "medicos", uid);
    const pacienteDocRef = doc(firestore, "pacientes", uid);
  
    const medicoDoc = await getDoc(medicoDocRef);
    const pacienteDoc = await getDoc(pacienteDocRef);
  
    if (medicoDoc.exists()) {
      return medicoDoc.data().rol;
    } else if (pacienteDoc.exists()) {
      return pacienteDoc.data().rol;
    } else {
      throw new Error("Documento no encontrado");
    }
  }

  function setUserWithFirebaseRol(usuarioFirebase){
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData final", userData);
    });
  }

  onAuthStateChanged(auth,(usuarioFirebase)=>{
    if(usuarioFirebase){
      
      if(!user){
        setUserWithFirebaseRol(usuarioFirebase);
      }

    } else{
      setUser(null);
    }
  })
}*/

//Create
export async function CreatePatient(email,password,name,lastName){
  await createUserWithEmailAndPassword(auth, email, password)
.then(async (userCredential) => {
  // Signed in 
  const user = userCredential.user;
  await AddToDBPatient(user.uid,user.email,name,lastName,'pacientes',"inactivo")
})
.catch((error) => {
  console.error("Error al crear Paciente: "+error)
})
await auth.signOut()
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

