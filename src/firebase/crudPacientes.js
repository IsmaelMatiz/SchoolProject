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

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { AddToDB, auth, db } from './firebaseConfi';

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
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  AddToDB(user.uid,user.email,name,lastName,'pacientes')
})
.catch((error) => {
  console.error("Error al crear Paciente: "+error)
});
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
//Delete


