import React, { useEffect, useState } from "react"
import { getAllTherapiesAssigments } from "../../../firebase/CRUD/crudAsignacionTerapias"
import { getATherapy } from "../../../firebase/CRUD/crudLinksTerapias"
import { getAPatient } from "../../../firebase/CRUD/crudPacientes"
import { TableItemAssiTherapies } from "./TableItemAssigmentTerapies"


export function AssigmentsTherapies(params) {
    const [idsAssignments, setIdsAssigments ] = useState( [] )
    const [dataAssignments, setDataAssigments] = useState([])

    //Obtener los Ids de todo
    useEffect(() =>{

        // funcion para mostrar todos los docs
    async function getAssignmentsT(){
        const result = await getAllTherapiesAssigments()
        setIdsAssigments(result)
    }

        getAssignmentsT()
    }, [] )

    //pasar esos Ids a la info real de los usuarios o terapias
    useEffect(() => {
        async function getAllData() {
          const allInfoDocs = await Promise.all(
            idsAssignments.map(async (a) => {
              let nombreT;
              let emailP;
    
              try {
                const therapy = await getATherapy(a.id_therapy);
                console.log("TERAPIAAAA---------")
                console.log(a.id_therapy)
                nombreT = therapy[0].titulo_terapia;
                console.log(nombreT)
              } catch {
                nombreT = "No existe la Terapia";
              }
    
              try {
                const patient = await getAPatient(a.id_paciente);
                emailP = patient[0].email;
              } catch {
                emailP = "No existe el Paciente";
              }
    
              return {
                id: a.id,
                title_therapy: nombreT,
                email_paciente: emailP,
              };
            })
          );

          setDataAssigments(allInfoDocs);
        }
    
        getAllData();
      }, [idsAssignments]);

    return(
        <React.Fragment>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
                <table className='table my-table table-hover'>
                <thead>
                    <tr>
                    <th>Titulo Terapia</th>
                    <th>Correo Paciente</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataAssignments.map( (assignment) =>
                            <TableItemAssiTherapies
                            key={assignment.id}
                            id={assignment.id} 
                            title_therapy={assignment.title_therapy}
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
