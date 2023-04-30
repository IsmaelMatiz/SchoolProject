import React, { useState } from "react";
import { Link} from "react-router-dom";
import { deleteAdmin, updateAdmin } from "../../firebase/CRUD/crudAdmin";
import { deleteDoctor, updateDoctor } from "../../firebase/CRUD/crudMedicos";
import { deletePatient } from "../../firebase/CRUD/crudPacientes";
import "../../styles/itemTable/item.css"

export function TableItemt(props) {

    const [verifyDelete, setVerifyDelete] = useState(false)
    const [verifyEdit, setVerifyEdit] = useState(false)
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleDelete(){
        const continuar = prompt("Por motivos de seguridad es posible que se cierre la sesion al borrar un perfil, desea continuar? si/no")
        if(continuar.toLowerCase() == "si"){
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
            }
        }   
    }

    async function handleUpdate(){
        //Actualizar paciente
        const continuar = prompt("Por motivos de seguridad se cerrar la sesion al editar un perfil, desea continuar? si/no")
        if(continuar.toLowerCase() == "si"){
                //Actualizar Medico
                if (props.rol === "Medico"){
                    let success = false
                
                    success = await updateDoctor(props.id,name,lastName,email,props.email,password)
                    
                    setTimeout(() => {
                        if(success) window.location.reload()
                        else alert("Email o clave incorrectas")
                      }, 4000)
                }else if(props.rol === "Admin"){
                //Actualizar Admin
                    let success = false
                
                    success = await updateAdmin(props.id,name,lastName,email,props.email,password)
                    setTimeout(() => {
                        if(success) window.location.reload()
                        else alert("Email o clave incorrectas")
                      }, 4000)
                }
        }
    }

    return(
            <tr key={props.id}>
                {verifyEdit?
                <React.Fragment>
                    <td>
                        <input type="text"  placeholder={props.nombre} 
                        onChange={e => setName(e.target.value)} />
                    </td>
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
                                        <input type="password" placeholder="Ingrese clave de este usuario para confirmar"
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