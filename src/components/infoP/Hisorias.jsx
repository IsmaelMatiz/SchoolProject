import React, { useState } from 'react'
import { MenuDashboardPaciente } from './menuDashboardPaciente'
import "../../styles/dashBoardPaciente/dashboard/dashboardInner.css"
import "../../styles/profile/profile.css"
import { useLocation } from 'react-router-dom';
import { getPatientClinicHistory, setPatientClinicHistory } from '../../firebase/CRUD/crudPacientes';
import { useEffect } from 'react';

export function HistoriasC () {

  let dataProfile = useLocation()
  const [success, setSuccess] = useState(0)
  const [urlPdf, setUrlPdf] = useState("")


  async function uploadPdf(e){
    e.preventDefault()
    const pdfFile = e.target.pdfHistoria.files[0]
    if (!pdfFile) {
      alert("Por favor elige un docmento primero")
    }else{
      let success = await setPatientClinicHistory(dataProfile.state.idUser,pdfFile)
      success ? setSuccess(1): setSuccess(2)
    }
  }

  async function getUrlPdf(params) {
    setUrlPdf(await getPatientClinicHistory(dataProfile.state.idUser))
    console.log("Aqui recivo pdf: ")
    console.log(urlPdf)
  }
  useEffect(()=>{
    getUrlPdf()
  },[])

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2">
          <MenuDashboardPaciente />
        </div>
        <div className="col-10">
          <div className="interior-dashboard">
          <h2>Historia Clinica</h2>
          {dataProfile.state.power == "admin"?
          <React.Fragment>
            <form className="buttons-file" onSubmit={uploadPdf}>
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
          {urlPdf == "no"?
          <h4>No hay Historia clinica</h4>
          :
          <iframe 
          src={urlPdf} 
          type="application/pdf"></iframe>
          }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
