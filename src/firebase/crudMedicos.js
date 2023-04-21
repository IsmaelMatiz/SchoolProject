import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { AddToDB, auth, db } from "./firebaseConfi";


//Create
export async function CreateDoctor(email,password,name,lastName){
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    AddToDB(user.uid,user.email,name,lastName,'medicos')
  })
  .catch((error) => {
    console.error("Error al crear Medico: "+error)
  });
}
  
//Read
export async function getAllDoctors(){
  
    try {
      const allDoctors = []
      const doctorCollectionRef= collection(db,"medicos")
      const data = await getDocs(doctorCollectionRef)
    
      data.forEach(doc => {
        allDoctors.push(doc.data())
      })
      
      return allDoctors
  
    } catch (error) {
      console.error("Error al obtener todos los admins: "+error)
    }
    
}

//update
//Delete