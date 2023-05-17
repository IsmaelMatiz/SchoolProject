import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteATherapy } from "../../../firebase/CRUD/crudLinksTerapias";
import { ConfirmPopup } from "../../Alerts/ConfirmPopup";


export function TableItemTherapy(props) {
    const [success, setSuccess] = useState(0)//dependiendo el numero notifica al usuario de si todo salio bien
    //Esto decide si mostrar o no el popup de confirmacion
    const[showConfirmPopup, setShowConfirmPopup] = useState(false)

        async function handleDelete() {
            let successD = await deleteATherapy(props.id)
            
            successD? setSuccess(1) : setSuccess(2)

            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    return(
        <tr key={props.id}>
            <td>{props.title}</td>
            <td> <a href={props.link} target="blank">{props.link}</a></td>
            <td>
                <button className="btn btn-light">
                <Link to={"/RegisterTherapy"} state={//go to the profile
                        {id:props.id,
                         action:"edit",
                         title:props.title,
                         linkt:props.link
                        }
                        }><i class="bi bi-pen"></i></Link>
                </button>
                <button onClick={ () => {//Borrar
                    setShowConfirmPopup("si")
                } } className="btn btn-light"><i class="bi bi-trash"></i></button>
            </td>
            <ConfirmPopup
                trigger={showConfirmPopup}
                setTrigger={setShowConfirmPopup}
                setAccept={handleDelete}
            >
                Estas seguro que deseas borrar esta terapia
                {
                success == 0? <span></span> 
                : success == 1? 
                <div class="alert alert-success" role="alert">
                    Terapia borrada exitosamente
                </div>
              : success == 2? 
                <div class="alert alert-warning" role="alert">
                    Erro al borrar terapia intente mas tarde
                </div>
                : <span></span>
                }
            </ConfirmPopup>
        </tr>
    )
}
