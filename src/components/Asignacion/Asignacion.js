import React from 'react'
import  { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfi'
import "./Asignacion2.css"

const Asignacion = () => {
// PACIENTES

    const [medicos, SetMedicos ] = useState( [] )

// db firestore
const medicosCollection = collection(db, "pacientes")

// funcion para mostrar todos los docs
const getMedicos = async () =>{
   const data = await getDocs(medicosCollection)
   SetMedicos(
    data.docs.map((doc) => ({
        ...doc.data(), id:doc.id
    })
   ))
}

// funcion para eliminar un doc
const deleteMedicos = async (id)=>{
    const medicosDoc = doc(db, "pacientes", id)
    await deleteDoc(medicosDoc)
    getMedicos()
}

// usamos useEffect
useEffect(() =>{
    getMedicos()
}, [] )

// MEDICOS

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


  // Mostrar datos
  const [pacientes, SetPacientes ] = useState( [] )


// funcion para mostrar todos los docs
const getPacientes = async () =>{
   const data = await getDocs(pacientesCollection)
   SetPacientes(
    data.docs.map((doc) => ({
        ...doc.data(), id:doc.id
    })
   ))
}

// usamos useEffect
useEffect(() =>{
  getPacientes()
}, [] )

  return (
    <>
     <div className='container'>
  <div className='row'>
    <div className='col'>

      <br />
      <h2 className='text-center mb-3'>Lista Pacientes</h2>
      <br />

      <table className='table table table-hover table-smaller'>

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>

        <tbody>
          { medicos.map( (medico) =>(
            <tr key={medico.id}>
              <td>{medico.nombre}</td>
              <td>{medico.apellido}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>

    <div className='col'>

      <br />
      <h2 className='text-center mb-3'>Lista Medicos</h2>
      <br />

      <table className='table table table-hover table-smaller'>

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>

        <tbody>
          { pacientes.map( (paciente) =>(
            <tr key={paciente.id}>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>
</div>
<br/>
<br/>
<br/>
    </>

    )
  
}

export default Asignacion
