import { createUserWithEmailAndPassword } from "firebase/auth";
import { AddToDB, auth } from "./firebaseConfi";

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
  