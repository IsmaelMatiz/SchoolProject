import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfi'

const Edit = () => {
  const [nombre, setNombre ] = useState('')
  const [apellido, setApellido ] = useState('')
  const [email, setEmail ] = useState('')

  const navigate = useNavigate()
  const {id} = useParams()

  const update = async(e) =>{
    e.preventDefault()
    const medico = doc(db, "pacientes", id)
    const data = {nombre: nombre, apellido:apellido, email:email}
    await updateDoc(medico, data)
    navigate("/Pacientes")
  }

  const getNombreById = async (id) =>{
    const medico = await getDoc(doc(db, "pacientes", id))
    if(medico.exists()){
      setNombre(medico.data().nombre)
      setApellido(medico.data().apellido)
      setEmail(medico.data().email)

    }else{
      
    }
  }

  useEffect( () => {
    getNombreById(id)
  }, [id])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
            <h1>Editar Medico</h1>

              <form onSubmit={update}>

                <div className='mb-3'>
                  <label className='form-label'>Nombre</label>
                  <input  
                  value={nombre}
                  onChange={ (e)=>setNombre(e.target.value)}
                  type="text"
                  className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Apellido</label>
                  <input  
                  value={apellido}
                  onChange={ (e)=>setApellido(e.target.value)}
                  type="text"
                  className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Correo</label>
                  <input  
                  value={email}
                  onChange={ (e)=>setEmail(e.target.value)}
                  type="text"
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

export default Edit
