import React, { useState } from 'react'
import { MenuDashboardPaciente } from './menuDashboardPaciente'
import "../../styles/dashBoardPaciente/dashboard/dashboardInner.css"
import { getATherapyAssigment } from '../../firebase/CRUD/crudAsignacionTerapias'
import { useLocation } from 'react-router-dom'
import { getATherapy } from '../../firebase/CRUD/crudLinksTerapias'
import { useEffect } from 'react'

export function Terapias () {

  const [therapies, setMyTherapies ] = useState( [] )
  
  //Esta ayudara proximamente a obtener la info desde la pagina anterior cuando se invoque esta pagina
  let dataProfile = useLocation()

    async function getUserTherapies(){
        const myTherapies = []
        console.log("PODERR DE ADMIN")
        console.log(dataProfile.state.idUser)
        const idsMyTherapies = await getATherapyAssigment(dataProfile.state.idUser,"id_paciente")

        idsMyTherapies.forEach(async(assignment)=>{
            const infoTherapy= await getATherapy(assignment.id_therapy)
            myTherapies.push(infoTherapy[0])
        })

        
        setTimeout(() => {
            setMyTherapies(myTherapies)
        }, 4000)
        
    }

    useEffect(()=>{
      getUserTherapies()
    },[])

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2">
          <MenuDashboardPaciente />
        </div>
        <div className="col-10">
          <div className="interior-dashboard">
          <h2>Terapias</h2>
          
          {
            therapies.map((t)=>{
              return(
                <React.Fragment>
                  <div className="my-therapies">
                    <h3>{t.titulo_terapia}</h3>
                    <a href={t.link_terapia} target="_blank" rel="noopener noreferrer">
                      <button className='btn btn-therapy'>Ir a la terapia</button>
                    </a> 
                  </div>
                </React.Fragment>
              )
            })
          }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
