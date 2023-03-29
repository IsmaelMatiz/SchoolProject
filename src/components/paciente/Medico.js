import React, {useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { collection } from 'firebase/firestore'
import  { db } from '../../firebase/firebaseConfi'
import { doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";



const auth = getAuth();


const Medico = () => {

  const [nombre, setNombre ] = useState("");
  const [apellido, setApellido ] = useState("");
  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  const [rol, setRol ] = useState("");

  const pacientesCollection = collection(db, "medicos")

  const GuardarFira = async (a)=>{
    const docuRef = collection(db, `medicos`);
    await setDoc(doc(docuRef,`/${a}`), {email:email, rol:rol, nombre:nombre, apellido:apellido});
    
  }

  // registro
  const handleLogin =async (e)=>{
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    e.target.reset()
    GuardarFira(user.uid)

  })
  .catch((error) => {
    
  });
  
  }

  // Mostrar datos
  const [pacientes, SetPacientes ] = useState( [] )


// funcion para mostrar todos los docs
const getPacientes = useCallback(async () =>{
  const data = await getDocs(pacientesCollection)
  SetPacientes(
   data.docs.map((doc) => ({
       ...doc.data(), id:doc.id
   })
  ))
}, [pacientesCollection, SetPacientes]);

// funcion para eliminar un doc
const deletePacientes = async (id)=>{
    const pacientesDoc = doc(db, "medicos", id)
    await deleteDoc(pacientesDoc)
    getPacientes()
}

// usamos useEffect
useEffect(() =>{
  getPacientes()
}, [getPacientes]);

  return (
    <>
    <div className='container'>
      <div className='row'>
      <div className='col-md-4'>
      <br />
      <h3 className='text-center mb-3'>Ingresar Medico</h3>
      <form onSubmit={handleLogin}>
        <div className='card card-body'>
          <div className='form-group'>
          <input type="text" className='form-control mb-2' placeholder='Ingresar Nombre' onChange={e=>setNombre(e.target.value)}/>
          <input type="text" className='form-control mb-2' placeholder='Ingresar Apellido' onChange={e=>setApellido(e.target.value)} />
          <input type="text" className='form-control mb-2' placeholder='Ingresar Correo' onChange={e=>setEmail(e.target.value)} />
          <input type="text" className='form-control mb-2' placeholder='Ingresar Contraseña' onChange={e=>setPassword(e.target.value)}/>
          <input type="text" className='form-control mb-2' placeholder='Ingresar Rol' onChange={e=>setRol(e.target.value)}/>
          </div>
          <button className='btn btn-primary mt-3'>
            Guardar
          </button>
          
        </div>
      </form>
      </div>

      <div className='col-md-8'>
      <br/>
        <h2 className='text-center mb-3'>Lista Medicos</h2>
        <div className='container card'>
          <div className='card-body'>
          { pacientes.map( (paciente) =>(
                    <div key={paciente.id}>
                        <p>Nombre: {paciente.nombre}</p>
                        <p>Apellido: {paciente.apellido} </p>
                        <p>Correo: {paciente.email} </p>
                        
                            <Link to={`/EditMedico/${paciente.id}`} className="btn btn-success m-1">Editar</Link>
                            <button onClick={ () => {deletePacientes(paciente.id)} } className="btn btn-danger">Eliminar</button>
                            <hr/>
                    </div>
                ))}
          

          </div>
        </div>
      </div>

    </div>
    </div>
    </>
    
  )
}

export default Medico
