import React from 'react'
import "../../styles/Header/Barra.css"
import { Link} from 'react-router-dom'
import { LoginSection } from './logInLogOut'

export default function Barra () {
  
      return (
      <React.Fragment>
        <nav class="navbar navbar-light justify-content-between barraMenu">
            <a class="navbar-brand">Navbar</a>
            <div class="d-flex align-items-center">
              <LoginSection></LoginSection>
            </div>
        </nav>
      </React.Fragment>
    )
}
