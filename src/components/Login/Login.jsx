import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userType } from "../../firebase/authProvider";
import { getAPatient } from "../../firebase/CRUD/crudPacientes";
import { auth } from "../../firebase/firebaseConfi";
import "../../styles/Login/Login.css"
import { CerrarSesion } from "../barra/logInLogOut";

export function Login (){

    const [error, setError] = useState(false)//si el usuario se equivoca al ingresar el email o password se lo alertamos
    const navigate = useNavigate()//Redireccionar una vez el usuario se a logueado o desloqueado

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

        //Limpiar campos
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



    return(
        <React.Fragment>
            <div className="row">
                <div className="col left-login">
                <div class="card">
                      <div class="card-body">
                        <h1 class="card-title">Iniciar Sesion</h1>
                        <p class="card-text">Introduce tus datos para iniciar sesión</p>
                        <form className="my-sign-p-4" id='cuadro' onSubmit={HandlerSubmit}>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person"></i></div>
                                <input type="email" class="form-control" name="email" placeholder="Email" />
                            </div>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-lock"></i></div>
                                <input type="password" name="password" class="form-control" placeholder="Password"  />
                            </div>
                            <button type="submit" className="btn btn-sesion">Ingresar</button>
                            {/*error? <span>Error con el correo o la contraseña</span>:<span></span>*/}             
                        </form>
                      </div>
                    </div>
                </div>
                <div className="col right-login">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Logo_de_la_Univesidad_de_la_Salle_%28Bogot%C3%A1%29.svg/2560px-Logo_de_la_Univesidad_de_la_Salle_%28Bogot%C3%A1%29.svg.png" alt="Logo la salle" />
                </div>
            </div>
        </React.Fragment>
    )
}