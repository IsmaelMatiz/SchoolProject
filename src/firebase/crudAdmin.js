import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { AddToDB, auth, db} from "./firebaseConfi";


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
export async function getAllAdmins(){
  
  try {
    const allAdmins = []
    const adminCollectionRef= collection(db,"admins")
    const data = await getDocs(adminCollectionRef)
  
    data.forEach(doc => {
      allAdmins.push(doc.data())
    })
    
    return allAdmins

  } catch (error) {
    console.error("Error al obtener todos los admins: "+error)
  }
  
}

//Update
//Delete