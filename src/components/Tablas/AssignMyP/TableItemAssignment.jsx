import React, { useState } from "react";
import { deleteAssignment } from "../../../firebase/CRUD/crudAsginacion";
import { ConfirmPopup } from "../../Alerts/ConfirmPopup";


export function TableItemAssignment(props){
    const [success, setSuccess] = useState(0)//dependiendo el numero notifica al usuario de si todo salio bien
    //Esto decide si mostrar o no el popup de confirmacion
    const[showConfirmPopup, setShowConfirmPopup] = useState(false)

    async function handleDelete(){
            let succes = await deleteAssignment(props.id)
            if (succes) {
                setSuccess(1)
            }else{
                setSuccess(2)
            }
            setTimeout(() => {
                window.location.reload()
            }, 4000)
    }

    return(
        <React.Fragment>
            <tr key={props.id}>
                <td>{props.email_doctor}</td>
                <td>{props.email_paciente}</td>
                <td><button onClick={()=>{
                    setShowConfirmPopup("si")
                }} className="btn btn-light"><i class="bi bi-trash"></i></button></td>
                <ConfirmPopup
                trigger={showConfirmPopup}
                setTrigger={setShowConfirmPopup}
                setAccept={handleDelete}
            >
                Estas seguro que deseas borrar esta assignacion?
                {
                success == 0? <span></span> 
                : success == 1? 
                <div class="alert alert-success" role="alert">
                    Asignacion borrada exitosamente
                </div>
              : success == 2? 
                <div class="alert alert-warning" role="alert">
                    Erro al borrar asignacion intente mas tarde
                </div>
                : <span></span>
                }
            </ConfirmPopup>
            </tr>
        </React.Fragment>
    )
}