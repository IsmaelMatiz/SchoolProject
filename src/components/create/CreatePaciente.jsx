import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreatePatient } from "../../firebase/crudPacientes";


export function CreatePatientView() {
    const [nombre, setNombre ] = useState("");
    const [apellido, setApellido ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const navigate = useNavigate()

    // registro
    const handleLogin =async (e)=>{
        e.preventDefault();
        CreatePatient(email,password,nombre,apellido)
        e.target.reset()
        navigate("/Pacientes")
    }

    

    return(
        <React.Fragment>
            <div className='container'>
      <div className='row'>
        <div className='col'>
            <h1>Crear Paciente</h1>

              <form onSubmit={handleLogin} >
                <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                  <input  
                  type="text"
                  className='form-control'
                  onChange={e=>setNombre(e.target.value)}
                  />

                  <label className='form-label'>Apellido</label>
                  <input  
                  type="text"
                  className='form-control'
                  onChange={e=>setApellido(e.target.value)}
                  />

                  <label className='form-label'>Correo</label>
                  <input  
                  type="email"
                  className='form-control'
                  onChange={e=>setEmail(e.target.value)}
                  />

                   <label className='form-label'>Contaseña</label>
                  <input  
                  type="password"
                  className='form-control'
                  onChange={e=>setPassword(e.target.value)}
                  />

                </div>

                <button type='submit' className='btn btn-primary'>Crear</button>
              </form>
                
        </div>
      </div>
    </div>
        </React.Fragment>
    )
}