import React, { useEffect, useState } from 'react'
import "./Barra.css"
import { Link,useNavigate } from 'react-router-dom';


import firebaseApp from '../../firebase/firebaseConfi';
import { getAuth, signInWithEmailAndPassword, signOut  } from 'firebase/auth';
const auth = getAuth();

const Barra = () => {

  const [error, setError] = useState(false)

  const handlerSubmit = async(e)=>{
      e.preventDefault()
      const email = e.target.email.value;
      const password = e.target.password.value;
      
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    e.target.reset()
    navigate("/Pacientes")
    // ...
  })
  .catch((error) => {
    setError(true)
  });
}
  
// barra
const [usuario, setUsuario] = useState(null)

useEffect( () =>{
  auth.onAuthStateChanged( (user) =>{
    if (user){
      setUsuario(user.email)
    }
  })

},[])

const CerrarSesion = () =>{
  auth.signOut()
  setUsuario(null)
  navigate("/Cuerpo")
}

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
  <button type="button" className="btn bg-FFC300 dropdown-toggle acceder" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
    Acceder
  </button>
  <form className="dropdown-menu p-4" id='cuadro' onSubmit={handlerSubmit}>
    <div className="mb-3">
      <label for="exampleDropdownFormEmail2" className="form-label" >Correo Electronico</label>
      <input type="email" className="form-control" id="email" placeholder="email@example.com"  required/>
    </div>
    <div className="mb-3">
      <label for="exampleDropdownFormPassword2" className="form-label">Contraseña</label>
      <input type="password" className="form-control" id="password" placeholder="Ingresar contraseña"  required/>
    </div>
    <button type="submit" className="btn btn-primary">Ingresar</button>
    <br />
    <br />
    {error && <span>Error con el correo o la contraseña</span>} 

  </form>
</div>
  
{
    usuario ? (<button onClick={CerrarSesion} className='btn btn-danger'>Cerrar Sesión</button>): (<span></span>)
  }

    </div>
    
  </div>
</nav>

</>
  );
};

export default Barra