import React from 'react'
import { Link } from 'react-router-dom';
import "../../styles/dashBoardPaciente/menup/menuPaciente.css"

export function MenuDashboardPaciente() {
  return (
    <React.Fragment>
      <ul class="navbar-paciente">
        <li className='li-navp'>
          <i class="bi bi-bar-chart"></i>
            <Link
            to={"/Seguimiento"}
            class="navp-item">
              Seguimiento
            </Link>
        </li>
        <li className='li-navp'>
          <i class="bi bi-clipboard-data"></i>
          <Link
          to={"/Progreso"}
          class="navp-item">
          Progreso
          </Link>
        </li>
        <li className='li-navp'>
          <i class="bi bi-calendar-week"></i>
          <Link
          to={"/Terapias"}
          class="navp-item">
          Programacion Terapias
          </Link>
        </li>
        <li className='li-navp'>
          <i class="bi bi-journal-bookmark"></i>
          <Link
          to={"/Historia-Clinica"}
          class="navp-item">
          Historia Clinica
          </Link>
        </li>
      </ul>
    </React.Fragment>
    
  )
}

