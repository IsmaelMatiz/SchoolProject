import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { infoLoggedUser } from "../../firebase/authProvider";
import { getADoctor, getAllDoctors } from "../../firebase/crudMedicos";
import { db } from "../../firebase/firebaseConfi";
import { TableItemt } from "./TableItem";

export function Medicos() {
    // hooks
const [medicos, setMedicos ] = useState( [] )

// funcion para mostrar todos los docs
async function getMedicos(){
    setMedicos(await getAllDoctors())
}
   

// usamos useEffect
useEffect(() =>{
    getMedicos()
}, [] )

    return(
        <React.Fragment>
                    <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="d-grid gap-2">
                    <Link to="/CrearMedico" className='btn btn-secondary mt-2 mb-2'>Crear</Link>
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
                            <TableItemt
                            key={medico.id}
                            id={medico.id}
                            nombre={medico.nombre}
                            apellido={medico.apellido}
                            email={medico.email}
                            rol={"Medico"}
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
        </React.Fragment>
    )
}
