import { auth } from "./firebaseConfi"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import "../components/barra/Barra.css"


export function LoginSection (){

    const [usuario, setUsuario] = useState(null) //nos perimte saber si el usuario esta logueado o no
    const navigate = useNavigate()//Redireccionar una vez el usuario se a logueado o desloqueado
    const [error, setError] = useState(false)//si el usuario se equivoca al ingresar el email o password se lo alertamos
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    async function handlerSubmit(e){
        e.preventDefault()
        setEmail(e.target.email.value)
        setPassword(e.target.password.value)

        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigate("/Pacientes")
            setError(false)
        })
        .catch((error) => {
            console.error("algo no salio bien iniciando sesion: "+ error)
            setError(true)
        });
        e.target.reset()
    }

    useEffect( () =>{
        auth.onAuthStateChanged( (user) =>{
          if (user){
            setUsuario(user.email)
          }
        })
      
      },[])

    function CerrarSesion (){
        setUsuario(null)
        auth.signOut()
        navigate("/")
    } 

    return(
        <React.Fragment>
            {
                usuario ? 
                <span></span>
                :
                <div className="dropdown Login">
                    <button type="button" className="btn bg-FFC300 dropdown-toggle acceder" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                    Acceder
                    </button>
    
                    <form className="dropdown-menu p-4" id='cuadro' onSubmit={handlerSubmit}>
                    <div className="mb-3">
                    <label for="exampleDropdownFormEmail2" className="form-label" >Correo Electronico</label>
                    <input type="email" className="form-control" name='email'  placeholder="email@example.com"  required/>
                    </div>
                    <div className="mb-3">
                    <label for="exampleDropdownFormPassword2" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name='password' placeholder="Ingresar contraseña"  required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                    <br />
                    <br />
                    {error? <span>Error con el correo o la contraseña</span>:<span></span>} 
    
                    </form>
                </div>
    
            }
        
        {
            usuario ? (<button onClick={CerrarSesion} className='btn btn-danger'>Cerrar Sesión</button>): (<span></span>)
        }
    </React.Fragment>
    )
}
