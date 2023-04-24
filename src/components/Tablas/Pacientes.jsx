import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getAllPatients } from '../../firebase/CRUD/crudPacientes'
import { TableItemt } from './TableItem'

const Pacientes = () => {

// hooks
const [pacientes, setPacientes ] = useState( [] )


// funcion para mostrar todos los docs
async function getPatients(){
    setPacientes(await getAllPatients())
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
                    <TableItemt
                    key={paciente.id}
                    id={paciente.id}
                    nombre={paciente.nombre}
                    apellido={paciente.apellido}
                    email={paciente.email}
                    rol={"Paciente"}
                    />
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
