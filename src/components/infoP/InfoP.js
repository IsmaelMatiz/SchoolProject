import React from 'react'
import { Link } from 'react-router-dom';
import "../../styles/Info.css"

function InfoP() {
  return (
    <>
    <br/>
    <ul class="nav justify-content-center">
  <li class="nav-item">
    <a class="nav-link1 active text-dark" aria-current="page" href="/Evolucion">EVOLUCIÓN</a>
  </li>
  <li class="nav-item">
    <a className='nav-link2 text-dark' href="/Cumplimiento">CUMPLIMIENTO</a>
  </li>
  <li class="nav-item">
    <a class="nav-link3 text-dark" href="/Deberes">DEBERES</a>
  </li>
  <li class="nav-item">
    <a class="nav-link3 text-dark" href="/HistoriaC">HISTORIA CLINICA</a>
  </li>
  <li class="nav-item">
    <a class="nav-link4 text-dark" href="/Edit">EDITAR PACIENTE</a>
  </li>
</ul>
<hr/>
    </>
    
  )
}

export default InfoP
