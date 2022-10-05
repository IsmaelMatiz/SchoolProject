import React from 'react'
import "./Barra.css"
import { Link,useNavigate } from 'react-router-dom';


const Barra = () => {

  const navigate = useNavigate()
    return (
    /*<nav className='barra'>
      <div className='barra-logo' onClick={toTheTop}>LA SALLE</div>
      <ul className='barra-menu'>
        <li className='barra-menu-item'><Link to='/Portada' className='barra-menu-link barra-link'>Contacto</Link></li>
        <li className='barra-menu-item'><Link to='/' className='barra-menu-link barra-link'>Registrarse</Link></li>
        <li className='barra-menu-item'><a href='#' className='barra-menu-link barra-link'>Iniciar Sesión</a></li>
      </ul>
    </nav>*/
    <>
      <nav className="navbar navbar-expand-lg bg-FFC300 py-0">
  <div className="container-fluid barraMenu">
    <a className="navbar-brand"><Link to='/Cuerpo' className='barra-menu-link barra-link'> LA SALLE</Link></a>


    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <a className="nav-link" href="#">Contacto</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <div className="dropdown Login">
  <button type="button" className="btn bg-FFC300 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
    Acceder
  </button>
  <form className="dropdown-menu p-4" id='cuadro'>
    <div className="mb-3">
      <label for="exampleDropdownFormEmail2" className="form-label" >Correo Electronico</label>
      <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com"/>
    </div>
    <div className="mb-3">
      <label for="exampleDropdownFormPassword2" className="form-label">Contraseña</label>
      <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Clave"/>
    </div>
    <div className="mb-3">
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="dropdownCheck2"/>
        <label className="form-check-label" for="dropdownCheck2">
          Recordarme
        </label>
      </div>
    </div>
    <button type="submit" className="btn btn-primary">Ingresar</button>

    <button type="submit" className="btn btn-primary Signin ms-5" onClick={()=>{navigate("/Login");}}>Registrarse</button>

  </form>
</div>
    </div>
  </div>
</nav>
    </>
  );
};

export default Barra

