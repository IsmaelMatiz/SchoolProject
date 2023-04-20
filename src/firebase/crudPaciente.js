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

import {doc, getDoc } from 'firebase/firestore';

import {onAuthStateChanged} from 'firebase/auth'


//TODO: Analizar pa q era esto XD
export function Rol(){
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
}



