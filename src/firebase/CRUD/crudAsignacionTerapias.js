import { AddToDB, auth, db, deleteFromDB, tempAuth, updateDB } from "../firebaseConfi";
import {addDoc, collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where
    } from 'firebase/firestore';

const asignCollectionRef= collection(db,"asignacionTerapias")

//Create

export async function AddToDBAssignmentTerapy (uidDoctor,emailDoctor,uidPaciente,emailPaciente){
    try {
      await addDoc(asignCollectionRef, {id_doctor:uidDoctor,email_doctor:emailDoctor, id_paciente: uidPaciente, email_paciente:emailPaciente})
      .then((docRef)=>{
        return updateDoc(docRef,{
          id: docRef.id
        })
      })
      console.log("Assigment Terapy exitoso")
    } catch (error) {
      console.error("Error al agregar a base de datos un asignamiento de terapia: "+ error)
    }
}
