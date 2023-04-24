import React, { useState } from "react";
import { Link} from "react-router-dom";
import { deleteAdmin } from "../../firebase/CRUD/crudAdmin";
import { deleteDoctor } from "../../firebase/CRUD/crudMedicos";
import { deletePatient } from "../../firebase/CRUD/crudPacientes";

export function TableItemt(props) {

    const [verifyDelete, setVerifyDelete] = useState(false)
    const [password, setPassword] = useState("")

    function handleDelete(){
        //Borrar Admin
        if (props.rol === "Admin"){
            deleteAdmin(props.id,props.email,password).catch(
                error => alert("Error al borrar Admin: "+error)
            )
            setTimeout(() => {
                window.location.reload()    
            }, 2000)
        //Borrar Doctor
        }else if (props.rol === "Medico"){
            deleteDoctor(props.id,props.email,password).catch(
                error => alert("Error al borrar doctor: "+error)
            )
            setTimeout(() => {
                window.location.reload()    
            }, 2000)
        //Borrar Paciente
        }else if(props.rol === "Paciente"){
            deletePatient(props.id,props.email,password).catch(
                error => alert("Error al borrar doctor: "+error)
            )
            setTimeout(() => {
                window.location.reload()    
            }, 2000)
        }
        
    }

    return(
            <tr key={props.id}>
                <td>{props.nombre}</td>
                    <td>{props.apellido}</td>
                    {verifyDelete? 
                    <React.Fragment>
                        <td>{props.email}</td>
                        <input type="text" placeholder="Ingrese su contrasena para verificar"
                        onChange={e => setPassword(e.target.value)}/>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </React.Fragment>
                    :
                    <td>{props.email}</td>}
                    <td>
                        <Link to={`/Edit/${props.id}`} className="btn btn-light m-1">Editar</Link>
                        <button onClick={ () => {
                            if(verifyDelete) setVerifyDelete(false)
                            else setVerifyDelete(true)
                        } } className="btn btn-danger">Eliminar</button>
                    </td>
                    </tr>
    )
    
}