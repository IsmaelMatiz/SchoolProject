import { auth } from "../../firebase/firebaseConfi"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth"
import { getAPatient } from "../../firebase/CRUD/crudPacientes"
import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import "../../styles/Header/Barra.css"
import  { userType } from "../../firebase/authProvider"


export function LoginSection (){

    const [usuario, setUsuario] = useState(null) //nos perimte saber si el usuario esta logueado o no
    const navigate = useNavigate()//Redireccionar una vez el usuario se a logueado o desloqueado
    const [error, setError] = useState(false)//si el usuario se equivoca al ingresar el email o password se lo alertamos

    async function HandlerSubmit(e){
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        await setPersistence(auth,browserSessionPersistence).then(
            async() =>
            {
                    return signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    setError(false)
                })
                .catch((error) => {
                    console.error("algo no salio bien iniciando sesion: "+ error)
                    setError(true)
                })
            }
        ) 

        const whoIsLogged = await userType(auth.currentUser.uid)
        //Verificar si el paciente esta activo antes de redireccionar
        if (whoIsLogged == "Paciente"){
            let paciente = await getAPatient(auth.currentUser.uid)
            console.log("el paciente esta: "+paciente[0].status)
            if (paciente[0].status == "activo") {
                RedirectUser(whoIsLogged)       
            } else {
                alert("Al parecer tu perfil no esta activo, comunicate con un medico o administrador para activarlo")
                CerrarSesion()
            }
        }else RedirectUser(whoIsLogged) 
        e.target.reset()
    }

    async function RedirectUser(user) {
        console.log("user is: "+ user)
        switch (user) {
            case "Nobody":
                navigate("/")
                break;
            
            case "Admin":
                navigate("/Admins")
                break;
            case "Medico":
                navigate("/Medicos")
                break;
            case "Paciente":
                navigate("/Evolucion")
                break;
            default:
                break;
        }
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
    
                    <form className="dropdown-menu p-4" id='cuadro' onSubmit={HandlerSubmit}>
                    <div className="mb-3">
                    <label for="exampleDropdownFormEmail2" className="form-label" >Correo Electronico</label>
                    <input type="email" className="form-control" name='email'  placeholder="email@example.com"  required/>
                    </div>
                    <div className="mb-3">
                    <label for="exampleDropdownFormPassword2" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name='password' placeholder="Ingresar contraseña"  required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>
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
