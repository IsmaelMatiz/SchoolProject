import { db } from "../firebaseConfi";
import {addDoc, collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where
    } from 'firebase/firestore';

const asignCollectionRef= collection(db,"asignacion")

//Create
export async function AddToDBAssignment (uidDoctor,uidPaciente){
    try {
      await addDoc(asignCollectionRef, {id_doctor:uidDoctor, id_paciente: uidPaciente})
      .then((docRef)=>{
        return updateDoc(docRef,{
          id: docRef.id
        })
      })
      console.log("Assigment exitoso")
    } catch (error) {
      console.error("Error al agregar a base de datos un asignamiento: "+ error)
    }
}

//Read
export async function getAllAssignments(){
  
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

export async function getAssignment(uid,field){
  
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
export async function deleteAssignment (id){
    try {
        const toBeDeleted = doc(asignCollectionRef, id)
        await deleteDoc(toBeDeleted) 
      } catch (error) {
        console.error("Error al eliminar asignamiento: "+error)
      }
}