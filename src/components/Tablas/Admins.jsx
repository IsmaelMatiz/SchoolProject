import React, {  useEffect, useState } from "react";
import { useCallback } from "react";
import { Link} from "react-router-dom";
import authProvider, { infoLoggedUser } from "../../firebase/authProvider";
import { getAllAdmins } from "../../firebase/CRUD/crudAdmin";
import {TableItemt } from "./TableItem";


export function Admins() {

    // hooks
    const [admins, setAdmins ] = useState( [] )
    authProvider()

    // funcion para mostrar todos los docs
    async function getAdmins (){
        setAdmins(await getAllAdmins())
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
                        {admins.map(admin => (
                            <TableItemt
                            key={admin.id}
                            id={admin.id}
                            nombre={admin.nombre}
                            apellido={admin.apellido}
                            email={admin.email}
                            rol={"Admin"}
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