import React, {useState} from 'react'
import { collection, CollectionReference } from 'firebase/firestore'
import  { db } from '../../firebase/firebaseConfi'
import { addDoc } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const auth = getAuth();


const Create = () => {
  const [nombre, setNombre ] = useState("");
  const [apellido, setApellido ] = useState("");
  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  const [rol, setRol ] = useState("");


  const GuardarFira = async (a)=>{
    const collectionRef = collection(db, 'pacientes')
    try {
      await addDoc(collectionRef, {email:email, rol:rol, nombre:nombre, apellido:apellido})  
    } catch (error) {
      console.error("se petaquio en guardar: "+ error)
    }
    
    
  }

  // registro
  const handleLogin =async (e)=>{
    e.preventDefault();
    console.log("the email is: "+email+" and the pass is: "+password)
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    e.target.reset()
    //GuardarFira(user.uid)

    navigate("/Pacientes")
  })
  .catch((error) => {
    console.error("Se petaquio en crear el usuario con email y password: "+error)
  });
  
  }
  const navigate = useNavigate()

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
            <h1>Crear Paciente</h1>

              <form onSubmit={handleLogin} >
                <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                  <input  
                  type="text"
                  className='form-control'
                  onChange={e=>setNombre(e.target.value)}
                  />

                  <label className='form-label'>Apellido</label>
                  <input  
                  type="text"
                  className='form-control'
                  onChange={e=>setApellido(e.target.value)}
                  />

                  <label className='form-label'>Correo</label>
                  <input  
                  type="email"
                  className='form-control'
                  onChange={e=>setEmail(e.target.value)}
                  />

                   <label className='form-label'>Contaseña</label>
                  <input  
                  type="password"
                  className='form-control'
                  onChange={e=>setPassword(e.target.value)}
                  />

                  <label className='form-label'>Rol</label>
                  <input  
                  type="text"
                  className='form-control'
                  onChange={e=>setRol(e.target.value)}
                  />

                </div>

                <button type='submit' className='btn btn-primary'>Crear</button>
              </form>
                
        </div>
      </div>
    </div>
  )
}

export default Create