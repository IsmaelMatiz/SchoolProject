import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { userType } from "../../firebase/authProvider";
import { getAdmin, getAdminProfilePic, setAdminProfilePic, updateAdmin } from "../../firebase/CRUD/crudAdmin";
import { getADoctor, getDoctorProfilePic, setDoctorProfilePic, updateDoctor } from "../../firebase/CRUD/crudMedicos";
import { getAPatient, getPatientProfilePic, setPatientProfilePic, updatePatient } from "../../firebase/CRUD/crudPacientes";
import "../../styles/profile/profile.css"
import { ChanchePassword } from "../Alerts/changePass";
import { ConfirmCrudAction } from "../Alerts/confirmCrudAction";

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
    const [userProf, setUserProf] = useState (null)//Tipo de usuario
    const [isUserProfSet, setIsUserProfSet] = useState(false);
    //show form to change password
    const[showConfirmPopup, setShowConfirmPopup] = useState(false)
    //show form to confirm update
    const[showConfirmCrudPopup, setShowConfirmCrudPopup] = useState(false)
    //Passwords para new crud
    const [supUserPassword, setSupUserPassword] = useState("")
    const [affectedUserPassword, setAffectedUserPassword] = useState("")

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
        if (infoProfile.length == 1) {
          setId(infoProfile[0].id);
          setName(infoProfile[0].name);
          setLastName(infoProfile[0].lastname);
          setEmail(infoProfile[0].email);
          setFEmail(infoProfile[0].email);
          console.log("\n//////////Data profile es: "+infoProfile[0].status+"/////////////////\n")
          setStatus(infoProfile[0].status)
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
    async function handleUpdateData() {
        console.log(userProf)
        console.log(id)
        console.log(name)
        console.log(lastName)
        console.log(email)
        console.log(femail)
        console.log(supUserPassword)
        console.log(affectedUserPassword)
        
            //Actualizar Medico
            if (userProf === "Medico"){
                let success = false
            
                success = await updateDoctor(id,name,lastName,email,femail,affectedUserPassword,supUserPassword)
                
                setTimeout(() => {
                    console.log("------/-/-/-/-/---sucess es----------"+success+"---------------/-/-/-//-/-/-/")
                    if(success) window.location.reload()
                    else alert("Email o clave incorrectas")
                  }, 4000)
            }else if(userProf === "Admin"){
            //Actualizar Admin
                let success = false
            
                success = await updateAdmin(id,name,lastName,email,femail,affectedUserPassword,supUserPassword)
                setTimeout(() => {
                    if(success) window.location.reload()
                    else alert("Email o clave incorrectas")
                  }, 4000)
            }else if(userProf === "Paciente"){
                let success = false
                success = await updatePatient(id,name,lastName,email,femail,affectedUserPassword,status,supUserPassword)
                setTimeout(() => {
                  if(success) window.location.reload()
                  else alert("Email o clave incorrectas")
                }, 4000);
            }
    }

    function handleChangePass(){
        setShowConfirmPopup(true)
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
                    {dataProfile.state.power == "Admin"?
                    <h1>Datos del usuario</h1>
                    :
                    <h1>Tus datos</h1>
                    }
                        {
                        infoProfile.map((data)=>{
                            return(
                                <React.Fragment>
                                <form className="form-edit" key={data.id} onSubmit={(e)=>{
                                    e.preventDefault()
                                    setShowConfirmCrudPopup("si")
                                    }}>
                                    
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

                                    
                                {dataProfile.state.power == "Admin"?//quien entro al perfil tiene poderes para cambiar el Status?
                                    <div class="my-input my-select">
                                    <div class="icono"><i class="bi bi-person-circle"></i></div>
                                    <select id="status" aria-label="Default select example"
                                    onChange={e=>{
                                        setStatus(e.target.value)
                                    }}
                                    >
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
                            <button class="btn my-btn btn-primary"
                            onClick={handleChangePass}
                            >Cambiar contraseña</button>

                                <ChanchePassword
                                trigger={showConfirmPopup}
                                setTrigger={setShowConfirmPopup}
                                email={data.email}
                                >
                                </ChanchePassword>
                            </React.Fragment>
                            ) 
                        })
                        }
                    </div>
                </div>
            </div>
            <ConfirmCrudAction
                    trigger={showConfirmCrudPopup}
                    setTrigger={setShowConfirmCrudPopup}
                    setPasswordSup={setSupUserPassword}
                    setPasswordAff={setAffectedUserPassword}
                    actionCrud={handleUpdateData}
                    >
                        
            </ConfirmCrudAction>
        </React.Fragment>
    )
}