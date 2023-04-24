import React, { useState } from "react";
import { Link} from "react-router-dom";
import { deleteAdmin } from "../../firebase/CRUD/crudAdmin";
import { deleteDoctor } from "../../firebase/CRUD/crudMedicos";
import { deletePatient } from "../../firebase/CRUD/crudPacientes";
import "../../styles/itemTable/item.css"

export function TableItemtPatient(props) {

    const [verifyDelete, setVerifyDelete] = useState(false)
    const [password, setPassword] = useState("")

    function handleDelete(){
        //Borrar Paciente
            deletePatient(props.id,props.email,password).catch(
                error => alert("Error al borrar doctor: "+error)
            )
            setTimeout(() => {
                window.location.reload()    
            }, 2000)
    }

    return(
            <tr key={props.id}>
                <td>{props.nombre}</td>
                    <td>{props.apellido}</td>
                    {verifyDelete? 
                    <React.Fragment>
                        <td>
                            <div>
                                {props.email}
                                <input type="password" placeholder="Ingrese contrasena de este admin para confirmar"
                                onChange={e => setPassword(e.target.value)}
                                class="input-delete"
                                />
                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </td>
                    </React.Fragment>
                    :
                    <td>{props.email}</td>}
                    <td>{props.status}</td>
                    <td>
                        <Link to={`/Edit/${props.id}`} className="btn btn-light m-1"><i class="bi bi-pen"></i></Link>
                        <button onClick={ () => {
                            if(verifyDelete) setVerifyDelete(false)
                            else setVerifyDelete(true)
                        } } className="btn btn-light"><i class="bi bi-trash"></i></button>
                    </td>
                    </tr>
    )
    
}