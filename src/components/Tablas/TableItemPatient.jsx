import React, { useState } from "react";
import { deletePatient, updatePatient } from "../../firebase/CRUD/crudPacientes";
import { auth } from "../../firebase/firebaseConfi";
import "../../styles/itemTable/item.css"

export function TableItemtPatient(props) {

    const [verifyDelete, setVerifyDelete] = useState(false)
    const [verifyEdit, setVerifyEdit] = useState(false)
    const [password, setPassword] = useState("")
    const [name, setNombre] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    function handleDelete(){
        const continuar = prompt("Por motivos de seguridad se cerrar la sesion al borrar un perfil, desea continuar? si/no")
        if(continuar.toLowerCase() == "si"){
            //Borrar Paciente
            console.log("Inicia el borrardo y el user es: " + auth.currentUser.email)
            deletePatient(props.id,props.email,password).catch(
                error => alert("Error al borrar doctor: "+error)
            )
            setTimeout(() => {
                window.location.reload()    
            }, 4000)
        }
    }

    async function handleUpdate(){
        //Actualizar paciente
        const continuar = prompt("Por motivos de seguridad se cerrar la sesion al editar un perfil, desea continuar? si/no")
        if(continuar.toLowerCase() == "si"){
            let status = document.getElementById("status").value
            let success = false

            success = await updatePatient(props.id,name,lastName,email,props.email,password,status)
            
            
            setTimeout(() => {
              if(success) window.location.reload()
              else alert("Email o clave incorrectas")
            }, 4000);
        }
    }

    return(
            <tr key={props.id}>
                    {verifyEdit?
                    <React.Fragment>
                        <td className="my-td">
                            <input type="text"  placeholder={props.nombre} 
                            onChange={e => setNombre(e.target.value)} /></td>
                        <td className="my-td">
                            <input type="text"  placeholder={props.apellido} 
                            onChange={e => setLastName(e.target.value)} />
                        </td>
                        <td className="my-td">
                            <input type="email" placeholder={props.email} 
                            onChange={e => setEmail(e.target.value)} />
                            <input type="password"  placeholder="Ingresa la clave del paciente" 
                            onChange={e => setPassword(e.target.value)} />
                        </td>
                        <td className="my-td">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person-circle"></i></div>
                                <select id="status" aria-label="Default select example">
                                {props.status === "activo"?
                                    <React.Fragment>
                                        <option selected value="activo">activo</option>
                                        <option value="inactivo">inactivo</option>
                                    </React.Fragment>
                                :
                                <React.Fragment>
                                    <option selected value="inactivo">inactivo</option>
                                    <option value="activo">activo</option>
                                </React.Fragment>
                                }
                                </select>
                             </div>
                        </td>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <td>{props.nombre}</td>
                        <td>{props.apellido}</td>
                        <td>
                                {props.email}
                                {verifyDelete? 
                                    <React.Fragment>
                                        <td>
                                            <div>
                                                <input type="password" placeholder="Ingrese contrasena de este admin para confirmar"
                                                onChange={e => setPassword(e.target.value)}
                                                class="input-delete"
                                                />
                                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                            </div>
                                        </td>
                                    </React.Fragment>
                                    :
                                    <span></span>
                                }
                        </td>
                        <td>{props.status}</td>
                    </React.Fragment>
                    }
                    <td>
                    {verifyEdit?
                    <React.Fragment>
                        <button onClick={ () => {//Confirmar Cambio
                            handleUpdate()
                        } } className="btn btn-light">Confirmar</button>
                        <button class="btn btn-danger" onClick={ () => {//Cancelar edit
                            setVerifyEdit(false)
                        } }>Cancelar</button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <button onClick={ () => {//Editar
                            if(verifyEdit) setVerifyEdit(false)
                            else setVerifyEdit(true)
                        } } className="btn btn-light"><i class="bi bi-pen"></i></button>
                        <button onClick={ () => {//Borrar
                            if(verifyDelete) setVerifyDelete(false)
                            else setVerifyDelete(true)
                        } } className="btn btn-light"><i class="bi bi-trash"></i></button>
                    </React.Fragment>
                    }
                    </td>
            </tr>
    )
    
}