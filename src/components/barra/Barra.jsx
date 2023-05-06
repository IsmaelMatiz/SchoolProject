import React from 'react'
import "../../styles/Header/Barra.css"
import { Link} from 'react-router-dom'
import { LoginSection } from './logInLogOut'

export default function Barra () {
  /*<div class="d-flex align-items-center">
              <LoginSection></LoginSection>
            </div>*/ 
  
      return (
      <React.Fragment>
        <nav class="navbar navbar-expand-lg navbar-light bg-light new-navbar">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="https://firebasestorage.googleapis.com/v0/b/sandbox-clinica.appspot.com/o/imegene-generales%2FlogoClinica.png?alt=media&token=056543a8-9d0f-4678-ae82-ab23b2f2a6f6" alt="" />
      Clinica
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Enlace</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Acción</a></li>
            <li><a class="dropdown-item" href="#">Otra acción</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Algo más aquí</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Deshabilitado</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
    </div>
  </div>
</nav>
      </React.Fragment>
    )
}
