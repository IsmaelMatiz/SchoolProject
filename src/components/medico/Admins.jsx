import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAdmins } from "../../firebase/crudAdmin";
import { db } from "../../firebase/firebaseConfi";


export function Admins() {

    // hooks
    const [admins, setAdmins ] = useState( [] )

    // funcion para mostrar todos los docs
    async function getAdmins (){
        setAdmins(await getAllAdmins())
    }


    // funcion para eliminar un doc
    const deleteMedicos = async (id)=>{
        const medicosDoc = doc(db, "pacientes", id)
        await deleteDoc(medicosDoc)
        getAdmins()
    }

// usamos useEffect
useEffect(() =>{
    getAdmins()
}, [] )

    return(
        <React.Fragment>
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
                        { admins.map( (medico) =>(
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
        </React.Fragment>
    )
}