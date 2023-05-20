import React, { useState } from "react"
import { useEffect } from "react"
import { getAllAssignments } from "../../../firebase/CRUD/crudAsginacion"
import { getADoctor } from "../../../firebase/CRUD/crudMedicos"
import { getAPatient } from "../../../firebase/CRUD/crudPacientes"
import { TableItemAssignment } from "./TableItemAssignment"

export function Assignments() {

    const [assignments, setAssignments ] = useState( [] )
    const [infoAssignments, setInfoAssigments] = useState([])

    useEffect(() =>{

        // funcion para mostrar todos los docs
    async function getAssignments(){
        const result = await getAllAssignments()
        setAssignments(result)
    }

        getAssignments()
    }, [] )

    useEffect(() => {
        async function getAllData() {
          const allInfoDocs = await Promise.all(
            assignments.map(async (a) => {
              let emailD;
              let emailP;
    
              try {
                const doctor = await getADoctor(a.id_doctor);
                emailD = doctor[0].email;
              } catch {
                emailD = "No existe el Doctor";
              }
    
              try {
                const patient = await getAPatient(a.id_paciente);
                emailP = patient[0].email;
              } catch {
                emailP = "No existe el Paciente";
              }
    
              return {
                id: a.id,
                email_doctor: emailD,
                email_paciente: emailP,
              };
            })
          );

          setInfoAssigments(allInfoDocs);
        }
    
        getAllData();
      }, [assignments]);

    console.log("info es: ")
    console.log(infoAssignments)
    return(
        <React.Fragment>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
                <table className='table my-table table-hover'>
                <thead>
                    <tr>
                    <th>Correo Medico</th>
                    <th>Correo Paciente</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        infoAssignments.map( (assignment) =>
                            <TableItemAssignment
                            key={assignment.id}
                            id={assignment.id} 
                            email_doctor={assignment.email_doctor}
                            email_paciente={assignment.email_paciente}
                            />
                        )
                    }
                </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}
