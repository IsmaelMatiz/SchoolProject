import React from 'react'
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthProvider from '../../firebase/authProvider';
import { auth } from '../../firebase/firebaseConfi';
import "../../styles/dashBoardPaciente/menup/menuPaciente.css"

export function MenuDashboardPaciente() {
  let dataProfile = useLocation()
  const navigate = useNavigate()//Redireccionar una vez el usuario se a logueado o desloqueado
  
  useEffect(()=>{
    auth.onAuthStateChanged(
      (user)=>{
        console.log("Si me ejecuto pero me vale madres")
        console.log(user)
        if (!user){
        setTimeout(() => {
            navigate("/")
            window.location.reload()
        }, 100);
        }
      }
    )
  },[])

  return (
    <React.Fragment>
      <ul class="navbar-paciente">
        <li className='li-navp'>
          <i class="bi bi-bar-chart"></i>
            <Link
            to={"/Seguimiento"}
            state={{idUser: dataProfile.state.idUser,power:dataProfile.state.power}}
            class="navp-item">
              Seguimiento
            </Link>
        </li>
        <li className='li-navp'>
          <i class="bi bi-clipboard-data"></i>
          <Link
          to={"/Progreso"}
          state={{idUser: dataProfile.state.idUser,power:dataProfile.state.power}}
          class="navp-item">
          Progreso
          </Link>
        </li>
        <li className='li-navp'>
          <i class="bi bi-calendar-week"></i>
          <Link
          to={"/Terapias"}
          state={{idUser: dataProfile.state.idUser,power:dataProfile.state.power}}
          class="navp-item">
          Programacion Terapias
          </Link>
        </li>
        <li className='li-navp'>
          <i class="bi bi-journal-bookmark"></i>
          <Link
          to={"/Historia-Clinica"}
          state={{idUser: dataProfile.state.idUser,power:dataProfile.state.power}}
          class="navp-item">
          Historia Clinica
          </Link>
        </li>
      </ul>
    </React.Fragment>
    
  )
}

