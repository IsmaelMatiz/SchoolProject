import React, { useEffect, useState } from 'react'
import { MenuDashboardPaciente } from './menuDashboardPaciente'
import "../../styles/dashBoardPaciente/dashboard/dashboardInner.css"
import { useLocation } from 'react-router-dom'
import { getPatientProgreso, getPatientSeguimiento, setPatientProgreso, setPatientSeguimiento } from '../../firebase/CRUD/crudPacientes'
export function Seguimiento () {
  
  let dataProfile = useLocation()
  const [success, setSuccess] = useState(0)
  const [urlPicSeguimiento, setUrlPicSeguimiento] = useState("")

  async function uploadImageProgreso(e){
    e.preventDefault()
    const imgFile = e.target.pdfHistoria.files[0]
    if (!imgFile) {
      alert("Por favor elige un docmento primero")
    }else{
      let success = await setPatientSeguimiento(dataProfile.state.idUser,imgFile)
      success ? setSuccess(1): setSuccess(2)
    }
  }

  async function getUrlImageProgreso() {
    setUrlPicSeguimiento(await getPatientSeguimiento(dataProfile.state.idUser))
  }

  useEffect(()=>{
    getUrlImageProgreso()
  },[])
  
  

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2">
          <MenuDashboardPaciente />
        </div>
        <div className="col-10">
          <div className="interior-dashboard">
          <h2>Seguimiento</h2>
          {dataProfile.state.power == "admin"?
          <React.Fragment>
            <form className="buttons-file" onSubmit={uploadImageProgreso}>
              <div className="my-upload-pdf">
                <i class="bi bi-cloud-arrow-up-fill"></i>
                <input type="file" name="pdfHistoria"/>
              </div>
              <button type='submit'>Subir Documento</button>
              {
                success == 0? <span></span> 
                : success == 1? 
                <div class="alert alert-success" role="alert">
                    Archivo subido exitosamente
                </div>
              : success == 2? 
                <div class="alert alert-warning" role="alert">
                    Error al subir archivo intente mas tarde
                </div>
                : <span></span>
            }
            </form>
          </React.Fragment>
          :
          <span></span>
          }
          {urlPicSeguimiento == "no"?
          <h4>No hay seguimiento del Paciente</h4>
          :
          <img src={urlPicSeguimiento} alt="Imagen del progreso del paciente" />
          }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
