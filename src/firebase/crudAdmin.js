import { createUserWithEmailAndPassword } from "firebase/auth";
import { AddToDB, auth} from "./firebaseConfi";


//Create
export async function CreateAdmin (email,password,name,lastName){
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    AddToDB(user.uid,user.email,name,lastName,'admins')
  })
  .catch((error) => {
    console.error("Error al crear admin: "+error)
  });
  }


//Read
//Update
//Delete