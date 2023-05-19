import React, { useEffect } from "react";
import { useState } from "react";
import { infoLoggedUser, userType } from "../../firebase/authProvider";
import { CreateAdmin } from "../../firebase/CRUD/crudAdmin";
import { CreateDoctor } from "../../firebase/CRUD/crudMedicos";
import { CreatePatient } from "../../firebase/CRUD/crudPacientes";
import { auth } from "../../firebase/firebaseConfi";
import "../../styles/Register/Register.css"

export function RegisterView(){

    const [success, setSuccess] = useState(0)
    const [editer, setEditer] = useState ("")
    

    //Registrar usuario independiente de su rol
    async function RegisterUser(data){
        //Primero Obtener la Info
        data.preventDefault()
        const name = data.target.name.value
        const lastName = data.target.lastName.value
        const email = data.target.email.value
        const password = data.target.password.value
        const verifyPassword = data.target.verify.value
        const supPass = data.target.supPassword.value
        const rol = data.target.rol.value
        console.log(rol)
        
        //Validar que contraseña y verify sean iguales
        if(password != verifyPassword) 
        {
            alert("Contraseñas no coinciden")
            setSuccess(2)
            return
        }

        //verificar el rol y en base a eso crear el perfil
        let success = false
        switch (rol) {
            case "1":
                success = await CreateAdmin(email,password,name,lastName,auth.currentUser.email,supPass)
                if (success) {
                    setSuccess(1)   
                }else setSuccess(2)
                setTimeout(() => {
                    window.location.reload()
                }, 4000)
                break
            case "2":
                success = CreateDoctor(email,password,name,lastName,auth.currentUser.email,supPass)
                if (success) {
                    setSuccess(1)   
                }else setSuccess(2)
                setTimeout(() => {
                    window.location.reload()
                }, 4000)
                break
            case "3":
                success = CreatePatient(email,password,name,lastName,auth.currentUser.email,supPass)
                if (success) {
                    setSuccess(1)   
                }else setSuccess(2)
                setTimeout(() => {
                    window.location.reload()
                }, 4000)
                break
            default:
                alert("Elige que rol deseas Crear")
                setSuccess(2)
                break;
        }

    }

    async function checkEditer() {
        const whoIsLogged = await userType( infoLoggedUser().uid)
        console.log(await whoIsLogged)
        setEditer(await whoIsLogged)
    }

    useEffect(()=>{
        checkEditer()
    },[editer])


    return(
        <React.Fragment>
            <div class="mx-auto card">
                <div class="card-body">
                    <h5 class="card-title">Registrate</h5>
                    <form onSubmit={RegisterUser}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nombre</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person"></i></div>
                                <input type="text" class="form-control" name="name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Apellido</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person"></i></div>
                                <input type="text" class="form-control" name="lastName" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo electrónico</label>
                            <div class="my-input">
                                <div class="icono"><i class=" bi bi-envelope-fill"></i></div>
                                <input type="email" class="form-control" name="email" aria-describedby="emailHelp" />
                            </div>
                            <div id="emailHelp" class="form-text">Nunca compartiremos su informacion personal con nadie más</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key"></i></div>
                                <input type="password" name="password" class="form-control"  />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Verificar Contraseña</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key-fill"></i></div>
                                <input type="password" name="verify" class="form-control"/>
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Elige el rol a crear</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person-circle"></i></div>
                                <select class="form-select" name="rol" aria-label="Default select example">
                                    <option selected>Elige un rol?</option>
                                    {editer == "Admin"?
                                    <React.Fragment>
                                        <option value="1">Admin</option>
                                        <option value="2">Medico</option>
                                        <option value="3">Paciente</option>
                                    </React.Fragment>
                                    :
                                    editer == "Medico"?
                                    <React.Fragment>
                                        <option value="3">Paciente</option>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <option value="0">nadie</option>
                                    </React.Fragment>
                                    }
                                </select>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Ingresa tu propia contraseña</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key-fill"></i></div>
                                <input type="password" name="supPassword" class="form-control"/>
                            </div>
                        </div>

                        <button type="submit" class="btn my-btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
            {
                success == 0? <span></span> 
                : success == 1? 
                <div class="alert alert-success" role="alert">
                    Usuario creado exitosamente
                </div>
              : success == 2? 
                <div class="alert alert-warning" role="alert">
                    Erro al crear usuario verifica todos los campos
                </div>
                : <span></span>
            }
        </React.Fragment>
    )
}
