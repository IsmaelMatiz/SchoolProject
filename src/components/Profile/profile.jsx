import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { infoLoggedUser, userType } from "../../firebase/authProvider";
import { getAdmin, getAdminProfilePic, setAdminProfilePic, updateAdmin } from "../../firebase/CRUD/crudAdmin";
import { getADoctor, getDoctorProfilePic, setDoctorProfilePic, updateDoctor } from "../../firebase/CRUD/crudMedicos";
import { getAPatient, getPatientProfilePic, setPatientProfilePic, updatePatient } from "../../firebase/CRUD/crudPacientes";
import "../../styles/profile/profile.css"

export function Profile() {
    //Esta variable ayuda a ver una vista previa de la imagen de perfil al momento de elegir un archivo
    const[previewProfilePic, setPreviewPic] = useState(null)
    //Esta variable almacena la imagen que haya en firebase
    const[currentProfilePic, setCurrentProfilePic] = useState(null)
    //Esta variable almacena la info de la DB como nombre, email...
    const[infoProfile, setInfoProfile] = useState([])

    //Esta ayudara proximamente a obtener la info desde la pagina anterior cuando se invoque esta pagina
    let dataProfile = useLocation()
    //User Info
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")
    const [femail, setFEmail] = useState("")//Email anterior
    const [password, setPassword] = useState("")
    const [userProf, setUserProf] = useState (null)//Tipo de usuario
    const [isUserProfSet, setIsUserProfSet] = useState(false);

    useEffect(()=>{
            //Esta funcion almacena en userProf el tipo de usuario
            async function checkEditer() {
                console.log("Se ejecuto Check Editer")
                const User = dataProfile.state.id
                
                if (User == null) {
                    setTimeout(() => {
                        checkEditer()
                    }, 2000);
                }else{
                    const whoIsLogged = await userType(User)
                    console.log("esta logueado un: "+ whoIsLogged)
                    setTimeout(() => {
                        setUserProf(whoIsLogged)
                        setIsUserProfSet(true); // Establecer la variable booleana en verdadero
                        fetchData(User,whoIsLogged)
                    }, 1000)
                }
    }
        checkEditer()

        const fetchData = async (id,typeUser) => {//Traer la Informacion del usuario logueado de la db y foto de perfil
            console.log("Se ejecuto fetchData")
            const idUser = id           
            console.log("userprof es: "+typeUser)

            if (typeUser == null) {
                setTimeout(() => {
                    fetchData(id,typeUser)
                }, 3000);
            }

            if (userProf == "Admin") {
                const url = await getAdminProfilePic(idUser)
                setCurrentProfilePic(url)
                const result = await getAdmin(idUser)
                setInfoProfile(result)  
            }else if (userProf == "Medico"){
                const url = await getDoctorProfilePic(idUser)
                setCurrentProfilePic(url)
                const result = await getADoctor(idUser)
                setInfoProfile(result)
            }else if (userProf == "Paciente"){
                    const url = await getPatientProfilePic(idUser)
                    setCurrentProfilePic(url)
                    const result = await getAPatient(idUser)
                    setInfoProfile(result)
            }      
        }

    },[isUserProfSet])


    useEffect(() => {
        if (infoProfile.length == 1 && dataProfile.state.power == "Admin") {
          setId(infoProfile[0].id);
          setName(infoProfile[0].nombre);
          setLastName(infoProfile[0].apellido);
          setEmail(infoProfile[0].email);
          setFEmail(infoProfile[0].email);
          console.log("\n//////////Data profile es: "+infoProfile[0].status+"/////////////////\n")
          setStatus(infoProfile[0].status)
        }else if(infoProfile.length == 1 && dataProfile.state.power == "User"){
            setId(infoProfile[0].id);
            setName(infoProfile[0].nombre);
            setLastName(infoProfile[0].apellido);
            setEmail(infoProfile[0].email);
            setFEmail(infoProfile[0].email);
        }
      }, [infoProfile]);


    //Esta funcion sube la imagen selecionada a firebase
    function handleUpdatePic(e) {
        e.preventDefault()
        const files = e.target.profilePic.files
        const fileReader = new FileReader()//permite convertir la imagen un un blob

        if(fileReader && files && files.length > 0){//nos aseguramos de que haya una imagen y q se pueda leer
            fileReader.readAsArrayBuffer(files[0])
            fileReader.onload = async function () {
                const imgData = fileReader.result//una vez tenemos el blob lo almacenamos en imgData
                if (userProf == "Admin") {
                    try {
                        const res = await setAdminProfilePic(id,imgData)
                        res? alert("Perfil actualizado exitosamente") : alert("Por favor elige una imagen")//Se envio exitosamente la imagen a firebase
                    } catch (error) {
                        alert("Error al actualizar imagen intenta de nuevo y verifica q si elegiste una imagen")
                    }
                }else if (userProf == "Medico"){
                    try {
                        const res = await setDoctorProfilePic(id,imgData)
                        res? alert("Perfil actualizado exitosamente") : alert("Por favor elige una imagen")//Se envio exitosamente la imagen a firebase
                    } catch (error) {
                        alert("Error al actualizar imagen intenta de nuevo y verifica q si elegiste una imagen")
                    }
                }else if (userProf == "Paciente"){
                    try {
                        const res = await setPatientProfilePic(id,imgData)
                        res? alert("Perfil actualizado exitosamente") : alert("Por favor elige una imagen")//Se envio exitosamente la imagen a firebase
                    } catch (error) {
                        alert("Error al actualizar imagen intenta de nuevo y verifica q si elegiste una imagen")
                    }
                }       
            }
        }else{
            alert("Elige una imagen primero intenta que sea 250x250")
        }
    }

    //Update the user info in the DB
    async function handleUpdateData(e) {
        e.preventDefault()

        const continuar = prompt("Por motivos de seguridad se cerrar la sesion al editar un perfil, desea continuar? si/no")
        if(continuar.toLowerCase() == "si"){
                //Actualizar Medico
                if (userProf === "Medico"){
                    let success = false
                
                    success = await updateDoctor(id,name,lastName,email,femail,password)
                    
                    setTimeout(() => {
                        if(success) window.location.reload()
                        else alert("Email o clave incorrectas")
                      }, 4000)
                }else if(userProf === "Admin"){
                //Actualizar Admin
                    let success = false
                
                    success = await updateAdmin(id,name,lastName,email,femail,password)
                    setTimeout(() => {
                        if(success) window.location.reload()
                        else alert("Email o clave incorrectas")
                      }, 4000)
                }else if(userProf === "Paciente"){
                    let status = document.getElementById("status").value
                    let success = false

                    success = await updatePatient(id,name,lastName,email,femail,password,status)

                    setTimeout(() => {
                      if(success) window.location.reload()
                      else alert("Email o clave incorrectas")
                    }, 4000);
                }
        }
    }

    return(
        <React.Fragment>
            <div className="row">
                <div className="col-4">
                    <div className="picture-section">
                        <h1>Perfil</h1>
                        <img src={previewProfilePic? previewProfilePic: currentProfilePic} alt="Imagen de perfil elegida" />
                        <form onSubmit={handleUpdatePic}>
                        <div className="my-input-file">
                            <i class="bi bi-cloud-arrow-up-fill"></i>
                            <input type="file" name="profilePic" onChange={(e)=>{
                                //Funcion para previsualizar imagen
                                const files = e.currentTarget.files

                                if (files.length > 0) {
                                    Object.keys(files).forEach((img) => {
                                        const file = files[img];

                                        let url = URL.createObjectURL(file)

                                        setPreviewPic(url)
                                    })
                                }

                            }}/>
                        </div>
                        <button type="submit">Confirmar Cambio</button>
                        </form>
                    </div>
                </div>

                <div className="col-8">
                    <div class="form-section">
                        {
                        infoProfile.map((data)=>{
                            return(
                                <form className="form-edit" key={data.id} onSubmit={handleUpdateData}>
                                    
                                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                    <div class="my-input">
                                        <div class="icono"><i class="bi bi-person"></i></div>
                                        <input type="text" class="form-control" name="name" value={name} onChange={e =>{
                                            setName(e.target.value)}
                                            }/>
                                    </div>


                                    <label for="exampleInputEmail1" class="form-label">Apellido</label>
                                    <div class="my-input">
                                        <div class="icono"><i class="bi bi-person"></i></div>
                                        <input type="text" class="form-control" name="lastName" value={lastName} onChange={e =>{ 
                                            setLastName(e.target.value)}
                                            }/>
                                    </div>


                                    <label for="exampleInputEmail1" class="form-label">Correo electrónico</label>
                                    <div class="my-input">
                                        <div class="icono"><i class=" bi bi-envelope-fill"></i></div>
                                        <input type="email" class="form-control" name="email" value={email} onChange={e =>{
                                            setEmail(e.target.value)}
                                        }/>
                                    </div>
                                    <div id="emailHelp" class="form-text">Nunca compartiremos su informacion personal con nadie más</div>


                                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                                    <div class="my-input">
                                        <div class="icono"><i class="bi bi-key"></i></div>
                                        <input type="password" name="password" class="form-control"  value={password} onChange={e =>{
                                            setPassword(e.target.value)
                                        }}/>
                                    </div>

                                    
                                {dataProfile.state.power == "Admin"?//quien entro al perfil tiene poderes para cambiar el Status?
                                    <div class="my-input my-select">
                                    <div class="icono"><i class="bi bi-person-circle"></i></div>
                                    <select id="status" aria-label="Default select example">
                                    {status === "activo"?//si el Status de usuario esta activo muestralo activo de lo contrario pues inactivo
                                        <React.Fragment>
                                            <option selected value="activo">activo</option>
                                            <option value="inactivo">inactivo</option>
                                        </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <option selected value="inactivo">inactivo</option>
                                        <option value="activo">activo</option>
                                    </React.Fragment>
                                    }
                                    </select>
                                 </div>
                                 :
                                 <span></span>
                                }
        
                                <button type="submit" class="btn my-btn btn-primary">Enviar</button>
                            </form>
                            )
                        })
                        }
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}