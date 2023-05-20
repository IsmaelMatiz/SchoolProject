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

export async function AddToDBAssignmentTerapy (idTherapy,idPaciente){
    try {
      await addDoc(asignCollectionRef, {id_therapy:idTherapy,id_paciente: idPaciente})
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

//Read
export async function getAllTherapiesAssigments(){
  
  try {
    const allAsigns = []
    const data = await getDocs(asignCollectionRef)
  
    data.forEach(doc => {
      allAsigns.push(doc.data())
    })
    
    return allAsigns

  } catch (error) {
    console.error("Error al obtener todos los asignamientos: "+error)
  }
  
}

export async function getATherapyAssigment(uid,field){

  try {
    const asign = []
    const queryGetDocs = query(asignCollectionRef, where(field,'==',uid));
    const data = await getDocs(queryGetDocs)
  
    data.forEach(doc => {
      asign.push(doc.data())
    })
    
    return asign

  } catch (error) {
    console.error("Error al obtener un asignamiento: "+error)
  }
  
}

//Delete
export async function deleteAssignmentTherapy (id){
  let success = false  
        const toBeDeleted = doc(asignCollectionRef, id)
        await deleteDoc(toBeDeleted).then(()=>{
          success = true
        }).catch(e =>{
          console.error("Error al borrar assigment: "+e)
        })
        return success
}
