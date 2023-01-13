import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfi'



const Pacientes = () => {

// hooks
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

// devolvemos vista de nuestro documento     

  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
            <div className="d-grid gap-2">
            <Link to="/Create" className='btn btn-secondary mt-2 mb-2'>Crear</Link>
            </div>

            <table className='table table-dark table-hover'>
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                { medicos.map( (medico) =>(
                    <tr key={medico.id}>
                        <td>{medico.nombre}</td>
                        <td>{medico.apellido}</td>
                        <td>{medico.email}</td>
                        <td>
                            <Link to={`/Edit/${medico.id}`} className="btn btn-light m-1">Editar</Link>
                            <button onClick={ () => {deleteMedicos(medico.id)} } className="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                ))}

            </tbody>


            </table>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    </>

  )
}

export default Pacientes
