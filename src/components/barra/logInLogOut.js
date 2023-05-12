import { auth } from "../../firebase/firebaseConfi"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth"
import { getAPatient, getPatientProfilePic } from "../../firebase/CRUD/crudPacientes"
import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import "../../styles/Header/Barra.css"
import  { userType } from "../../firebase/authProvider"
import { getAdmin, getAdminProfilePic } from "../../firebase/CRUD/crudAdmin"
import { getADoctor, getDoctorProfilePic } from "../../firebase/CRUD/crudMedicos"


export function LoginSection (){

    const [usuario, setUsuario] = useState(null) //nos perimte saber si el usuario esta logueado o no
    //Esta variable almacena la imagen que haya en firebase
    const[currentProfilePic, setCurrentProfilePic] = useState(null)
    //Esta variable almacena la info de la DB como nombre, email...
    const[infoProfile, setInfoProfile] = useState([])

    //User Info
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userProf, setUserProf] = useState (null)//Tipo de usuario

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

        //Traer la foto de perfil y la info de la db
        setInfoUser(whoIsLogged, auth.currentUser.uid)

        //Limpiar campos
        e.target.reset()
    }

    async function setInfoUser(whoIsLogged, idUser) {
        if (whoIsLogged == "Admin") {
            const url = await getAdminProfilePic(idUser)
            setCurrentProfilePic(url)
            const result = await getAdmin(idUser)
            setTimeout(() => {
                setInfoProfile(result)
            }, 2000);
        } else if(whoIsLogged == "Medico") {
            const url = await getDoctorProfilePic(idUser)
            setCurrentProfilePic(url)
            const result = await getADoctor(idUser)
            setTimeout(() => {
                setInfoProfile(result)    
            }, 2000);
            
        }else if(whoIsLogged == "Paciente"){
            const url = await getPatientProfilePic(idUser)
            setCurrentProfilePic(url)
            const result = await getAPatient(idUser)
            setTimeout(() => {
                setInfoProfile(result)    
            }, 2000);
        }
    }

    useEffect(()=>{
        if (infoProfile.length == 1) {
            setId(infoProfile[0].id);
            setName(infoProfile[0].nombre);
            setLastName(infoProfile[0].apellido);
          }
    },[infoProfile])

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
            setUsuario(user)
        }
        const setwhoIsLogged= async ()=>{
            const whoIsLogged = await userType(auth.currentUser.uid)
            setUserProf(whoIsLogged)
        }
        setwhoIsLogged()
        console.log("\n//////////////////////recibi: //////////////////////////\n"+userProf)
        setInfoUser(userProf,auth.currentUser.uid)

        })
      
      },[userProf])

      useEffect(()=>{
        const inactividad = auth.onAuthStateChanged((user) =>{
            if (user) {
                let timeout = setTimeout(() => {
                // cierra la sesión después de 30 minutos de inactividad
                CerrarSesion()
              }, 1800000);

              // restablece el temporizador si el usuario interactúa con la aplicación
                document.addEventListener('click', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                CerrarSesion()
                }, 1800000);
              });
            }else{
                //no hay Usuario Loggeado
            }
        })

        return () => inactividad()
      },[])


    function CerrarSesion (){
        setUsuario(null)
        auth.signOut()
        setTimeout(() => {
            navigate("/")
            window.location.reload()
        }, 100);
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
    
                    <form className="my-sign-in dropdown-menu p-4" id='cuadro' onSubmit={HandlerSubmit}>
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
            usuario ? (
                <div className="dropdown Login">
                    <button type="button" className="btn bg-FFC300 dropdown-toggle acceder" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                    Bienvenido {name}
                    </button>
    
                    <div className="my-sign-in dropdown-menu" id='cuadro'>
                        <div class="row">
                            <div class="col-6"><img src={currentProfilePic} alt="Imagen de perfil elegida" /></div>
                            <div class="col-6">
                            <div>{name} {lastName}</div>
                            <div onClick={()=>{
                                    setTimeout(() => {
                                        window.location.reload()
                                    }, 1000);
                                }}><Link to={"/Profile"} state={
                                {id:id,
                                 power:"User",
                                 reload:"si"
                                }
                                } class="my-profile">ver mi perfil</Link></div>
                            <div class="dropdown-divider"></div>
                            <div><button class="btn btn-danger" onClick={CerrarSesion}>Cerrar Sesion</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            ): (<span></span>)
        }
    </React.Fragment>
    )
}
