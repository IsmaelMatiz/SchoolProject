import React from "react";
import { deleteAssignment } from "../../../firebase/CRUD/crudAsginacion";


export function TableItemAssignment(props){
    async function handleDelete(){
        let confirm = prompt("Seguro que deseas borrar esta asignacion si/no")

        if(confirm.toLowerCase() === "si"){
            await deleteAssignment(props.id)

            setTimeout(() => {
                window.location.reload()
            }, 4000)
        }
    }

    console.log("////////////////////////A ver que con esto??!!!/////////////////")
    console.log(props.email_paciente)
    console.log(props.email_doctor)

    return(
        <React.Fragment>
            <tr key={props.id}>
                <td>{props.email_doctor}</td>
                <td>{props.email_paciente}</td>
                <td><button onClick={handleDelete} className="btn btn-light"><i class="bi bi-trash"></i></button></td>
            </tr>
        </React.Fragment>
    )
}