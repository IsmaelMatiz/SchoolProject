import React, { useEffect, useState } from 'react'

import firebaseApp from '../../firebase/firebaseConfi'
import { getAuth, signOut } from 'firebase/auth' 
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'

const auth = getAuth(firebaseApp)

const db = getFirestore(firebaseApp)

const Usuarios = ({correoUsuario}) =>{

  const valorInicial = {
    nombre: '',
    edad: '',
    correo: '' 
  }

  const [user, setUser] = useState({})
  const [lista, setLista] = useState([])


  const capturarInputs = (e) =>{
    const {name, value} = e.target;
    setUser({...user,[name]:value})
    
  }

  const guardarDatos = async(e)=>{
    e.preventDefault();
    try {
      await addDoc(collection(db,'pacientes'),{
        ...user
      })
    } catch (error) {
      console.log(error);
    }
    setUser({})
  }

  // funcion para renderizar la lista de usuarios
  useEffect(()=>{
    const getLista = async()=>{
      try {
        
        const querySnapshot = await getDocs(collection(db, 'pacientes'))
        const docs = []
        querySnapshot.forEach((doc)=>{
          docs.push({...doc.data(), id:doc.id})
          
        })
        setLista(docs)
        
      } catch (error) {
        console.log(error)
      }
    }
    getLista()
  },[setLista])

  return (
    <>
    <div className='container'>
    <br />
    <br />
        <div className='row'>
        <div className='col-md-4'>
            <h3 className='text-center mb-4'>Ingresar Pacientes</h3>
            <form onSubmit={guardarDatos}>
                <div className='card card-body'>
                    <div className='form-group'>
                    <input type="text" name="nombre " className='form-control mb-3' placeholder='ingresar nombre del paciente'
                    onChange={capturarInputs}  />

                    <input type="text" name="edad " className='form-control mb-3' placeholder='ingresar edad del paciente'
                     onChange={capturarInputs}  />
                    
                    <input type="email" name="correo " className='form-control mb-3' placeholder='ingresar correo del paciente'
                    onChange={capturarInputs} />
                    </div>
                    <button className='btn btn-primary'>
                        Guardar
                    </button>
                </div>
            </form>
        </div>
        <div className='col-md-8'>
            <h2 className='text-center mb-5'>Lista de Pacientes</h2>
            <div className='container card'>
              <div className='card-body'>
                {
                  lista.map((List,idx) =>{
                    return(
                      <div key={List.id}>
                      <p>Nombre: {List.nombre}</p>
                      <p>Edad: {List.edad}</p>
                      <p>Correo: {List.correo}</p>

                      <button className='btn btn-danger'>
                        Eliminar
                      </button>
                      <button className='btn btn-success m-2'>
                        Actualizar
                      </button>
                      <hr />
                    </div>  
                    )
                                       
                  })
                }
              </div>  

            </div>
       
        </div>
        </div>
    </div>
    <br />
    <br />
    <br />
    </>
    
    
  )
}

export default Usuarios
