import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deletePatient, updatePatient } from "../../../firebase/CRUD/crudPacientes";
import { auth } from "../../../firebase/firebaseConfi";
import "../../../styles/itemTable/item.css"
import { ConfirmCrudAction } from "../../Alerts/confirmCrudAction";
import { ConfirmPopup } from "../../Alerts/ConfirmPopup";

export function TableItemtPatient(props) {

    const [verifyDelete, setVerifyDelete] = useState(false)
    const [verifyEdit, setVerifyEdit] = useState(false)
    const [password, setPassword] = useState("")
    const [name, setNombre] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    //Esto decide si mostrar o no el popup de confirmacion
    const[showConfirmPopup, setShowConfirmPopup] = useState(false)
    const[continueProccess,setContinueProccess] = useState("no")

    const[showConfirmCrudPopup, setShowConfirmCrudPopup] = useState(false)
    //Passwords para new crud
    const [supUserPassword, setSupUserPassword] = useState("")
    const [affectedUserPassword, setAffectedUserPassword] = useState("")

    function handleDelete(){
        setShowConfirmCrudPopup("si")
        
    }

    async function newDeletePatient() {
        console.log("Aqui inicia el new delete de patient")
        let success = await deletePatient(props.id,props.email,affectedUserPassword,supUserPassword)

        if (success) {
            setTimeout(() => {
                window.location.reload()
            }, 4000);
        }else{
            alert("Error al borrar Medico verifique las claves")
        }
    }

    async function handleUpdate(){
        //Actualizar paciente
            let status = document.getElementById("status").value
            let success = false

            success = await updatePatient(props.id,name,lastName,email,props.email,password,status)
            
            
            setTimeout(() => {
              if(success) window.location.reload()
              else alert("Email o clave incorrectas")
            }, 4000);

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
                        
                        <td>
                        <Link to={"/Terapias"}>
                            {props.nombre}
                        </Link>
                        </td>
                        
                        <td>
                        <Link to={"/Terapias"}>
                            {props.apellido}
                        </Link>
                        </td>
                        
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
                        <button className="btn btn-light">
                        <Link to={"/Profile"} state={
                                {id:props.id,
                                 power:"Admin"
                                }
                                }><i class="bi bi-pen"></i></Link>
                            </button>
                        <button onClick={handleDelete} className="btn btn-light"><i class="bi bi-trash"></i></button>
                    </React.Fragment>
                    }
                    </td>

                    <ConfirmCrudAction
                    trigger={showConfirmCrudPopup}
                    setTrigger={setShowConfirmCrudPopup}
                    setPasswordSup={setSupUserPassword}
                    setPasswordAff={setAffectedUserPassword}
                    actionCrud={newDeletePatient}
                    >
                        
                    </ConfirmCrudAction>
            </tr>
    )
    
}