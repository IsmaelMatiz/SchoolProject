import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateDoctor } from '../../firebase/CRUD/crudMedicos'


const EditMedico = () => {

  const navigate = useNavigate()
  const id = useLocation().pathname.split("/")[2]

  const update = async(e) =>{
    e.preventDefault()
    let name = e.target.name.value
    let lastName = e.target.lastName.value
    let newEmail = e.target.newEmail.value
    let formerEmail = e.target.formerEmail.value
    let password = e.target.password.value
    var sucess = false
    
    sucess = await updateDoctor(id,name,lastName,newEmail,formerEmail,password)


    setTimeout(() => {
      if(sucess) navigate("/Medicos")
      else alert("Email o clave incorrectas")
    }, 1000);

  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
            <h1>Editar Medico</h1>

              <form onSubmit={update}>

                <div className='mb-3'>
                  <label className='form-label'>Nombre</label>
                  <input  
                  type="text"
                  name='name'
                  className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Apellido</label>
                  <input  
                  type="text"
                  name='lastName'
                  className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Nuevo Correo</label>
                  <input  
                  type="text"
                  name='newEmail'
                  className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Antiguo Correo</label>
                  <input  
                  type="text"
                  name='formerEmail'
                  className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Clave</label>
                  <input  
                  type="text"
                  name='password'
                  className='form-control'
                  />
                </div>

                <button type='submit' className='btn btn-primary'>Editar</button>
              </form>
                
        </div>
      </div>
    </div>
  )
}

export default EditMedico
