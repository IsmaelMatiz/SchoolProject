import { AddToDB, auth, db, deleteFromDB, tempAuth, updateDB } from "../firebaseConfi";
import {addDoc, collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where
    } from 'firebase/firestore';

const therapiesCollectionRef= collection(db,"linksTerapias")


//Create
export async function AddToDBTherapy (titulo,link){
    let success = true
    try {
      await addDoc(therapiesCollectionRef, {titulo_terapia:titulo,link_terapia:link})
      .then((docRef)=>{
        return updateDoc(docRef,{
          id: docRef.id
        })
      })
      console.log("Assigment therapy exitoso")
    } catch (error) {
      console.error("Error al agregar a base de datos un asignamiento de terapia: "+ error)
      success = false
    }
    return success
}

//Read
export async function getAllTherapies(){
  
    try {
      const allTherapies = []
      const data = await getDocs(therapiesCollectionRef)
    
      data.forEach(doc => {
        allTherapies.push(doc.data())
      })
      
      return allTherapies
  
    } catch (error) {
      console.error("Error al obtener todos los links de terapias: "+error)
    }
    
  }
  
  export async function getATherapy(id){
    
    try {
      const therapy = []
      const queryGetAdmin = query(therapiesCollectionRef, where('id','==',id));
      const data = await getDocs(queryGetAdmin)
    
      data.forEach(doc => {
        therapy.push(doc.data())
      })
      
      return therapy
  
    } catch (error) {
      console.error("Error al obtener un link de terapia: "+error)
    }
    
  }

//Update
export async function updateATherapy(id,newTitulo, newLink){
  let success = true
    try {
      const userRef = doc(therapiesCollectionRef,id)
      await updateDoc(userRef,{
        titulo_terapia: newTitulo,
        link_terapia: newLink,
      })
    } catch (error) {
      console.log("Error actualizando el : "+error) 
      success = false
    }
    return success
  }

//Delete
export async function deleteATherapy (id){
    let success = true
    try {
        const toBeDeleted = doc(therapiesCollectionRef, id)
        await deleteDoc(toBeDeleted) 
      } catch (error) {
        console.error("Error al eliminar asignamiento: "+error)
        success = false
    }
    return success
}
