import React, { useEffect, useState } from "react"
import { getAllTherapies } from "../../../firebase/CRUD/crudLinksTerapias"
import { TableItemTherapy } from "./TableItemTherapy"


export function TableTherapies() {

    const [linkst, setLinksT ] = useState( [] )

    // funcion para mostrar todos los liunks de terapias
    async function getAssignmentsTherapies(){
        setLinksT(await getAllTherapies())
    }

    useEffect(() =>{
        getAssignmentsTherapies()
    }, [] )
    
    return(
        <React.Fragment>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
                <table className='table my-table table-hover'>
                <thead>
                    <tr>
                    <th>Titulo terapia</th>
                    <th>Link terapia</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        linkst.map(therapy =>(
                            <TableItemTherapy
                            id={therapy.id}
                            title={therapy.titulo_terapia}
                            link={therapy.link_terapia}
                            >

                            </TableItemTherapy>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}
