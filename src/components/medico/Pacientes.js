import React, { useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfi'
import { getAllPatients, getAPatient } from '../../firebase/crudPacientes'

const Pacientes = () => {

// hooks
const [pacientes, setPacientes ] = useState( [] )


// funcion para mostrar todos los docs
async function getPatients(){
    setPacientes(await getAllPatients())
}

// funcion para eliminar un doc
const deleteMedicos = async (id)=>{
    const medicosDoc = doc(db, "pacientes", id)
    await deleteDoc(medicosDoc)
    getPatients()
}

// usamos useEffect
useEffect(() =>{
    getPatients()
}, [] )

// devolvemos vista de nuestro documento     

  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
            <div className="d-grid gap-2">
            <Link to="/CrearPaciente" className='btn btn-secondary mt-2 mb-2'>Crear</Link>
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
                { pacientes.map( (paciente) =>(
                    <tr key={paciente.id}>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.apellido}</td>
                        <td>{paciente.email}</td>
                        <td>
                            <Link to={`/Edit/${paciente.id}`} className="btn btn-light m-1">Editar</Link>
                            <button onClick={ () => {deleteMedicos(paciente.id)} } className="btn btn-danger">Eliminar</button>
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
