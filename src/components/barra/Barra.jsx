import React, { useEffect, useState } from 'react'
import "../../styles/Header/Barra.css"
import { Link} from 'react-router-dom'
import { LoginSection } from './logInLogOut'
import { auth } from '../../firebase/firebaseConfi'
import { userType } from '../../firebase/authProvider'

export default function Barra () {

  const [userProf, setUserProf] = useState(null)//Tipo de usuario
  
  useEffect( () =>{
    auth.onAuthStateChanged( (user) =>{
      
    const setwhoIsLogged= async ()=>{
        const whoIsLogged = await userType(auth.currentUser.uid)
        setUserProf(whoIsLogged)
    }
    setwhoIsLogged()
    
    })
  
  },[userProf])


      return (
      <React.Fragment>
        <nav class="navbar navbar-expand-lg navbar-light new-navbar">
  <div class="container-fluid">
  
    <Link class="navbar-brand active" to={"/"}>
      <img src="https://firebasestorage.googleapis.com/v0/b/sandbox-clinica.appspot.com/o/imegene-generales%2FlogoClinica.png?alt=media&token=056543a8-9d0f-4678-ae82-ab23b2f2a6f6" alt="" />
      Clinica
    </Link>
  
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <Link class="nav-link" to={"/"}>
              Inicio
            </Link>
        </li>

        {userProf == "Admin"?
            <li class="nav-item">
            <Link class="nav-link" to={"/Dashboard/admin"}>
              Dashboard Admin
            </Link>
            </li>
          :
          userProf == "Medico"?
          <li class="nav-item">
          <Link class="nav-link" to={"/Dashboard/medico"}>
            Dashboard Medico
          </Link>
          </li>
          :
          userProf == "Paciente"?
          <li class="nav-item">
          <Link class="nav-link" to={"/Seguimiento"}>
            Dashboard Paciente
          </Link>
          </li>
          :
          <span></span>
        }

        {userProf == "Admin"?
        <li class="nav-item">
        <Link class="nav-link" to={"/Admins"}>
          Admins
        </Link>
        </li>
        :
        <span></span>  
      }

      </ul>
      <div class="d-flex align-items-center" >
      <LoginSection></LoginSection>
      </div>
    </div>
  </div>
</nav>
      </React.Fragment>
    )
}
