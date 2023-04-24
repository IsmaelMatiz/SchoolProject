import React from "react";
import { useState } from "react";
import { CreateAdmin } from "../../firebase/CRUD/crudAdmin";
import { CreateDoctor } from "../../firebase/CRUD/crudMedicos";
import { CreatePatient } from "../../firebase/CRUD/crudPacientes";
import "../../styles/Register/Register.css"

export function RegisterView(){

    const [success, setSuccess] = useState(0)

    //Registrar usuario independiente de su rol
    function RegisterUser(data){
        //Primero Obtener la Info
        data.preventDefault()
        const name = data.target.name.value
        const lastName = data.target.lastName.value
        const email = data.target.email.value
        const password = data.target.password.value
        const verifyPassword = data.target.verify.value
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
        switch (rol) {
            case "1":
                CreateAdmin(email,password,name,lastName)
                setSuccess(1)
                break;
            case "2":
                CreateDoctor(email,password,name,lastName)
                setSuccess(1)
                break;
            case "3":
                CreatePatient(email,password,name,lastName)
                setSuccess(1)
                break;
            default:
                alert("Elige que rol deseas Crear")
                setSuccess(2)
                break;
        }

    }


    return(
        <React.Fragment>
            <div class="mx-auto card">
                <div class="card-body">
                    <h5 class="card-title">Registrate</h5>
                    <form onSubmit={RegisterUser}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nombre</label>
                            <div class="my-input">
                                <div class="icono"><i class=" bi bi-envelope-fill"></i></div>
                                <input type="text" class="form-control" name="name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Apellido</label>
                            <div class="my-input">
                                <div class="icono"><i class=" bi bi-envelope-fill"></i></div>
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
                        <div class="my-input">
                            <div class="icono"><i class="bi bi-person-circle"></i></div>
                            <select class="form-select" name="rol" aria-label="Default select example">
                                <option selected>Cual es tu rol?</option>
                                <option value="1">Admin</option>
                                <option value="2">Medico</option>
                                <option value="3">Paciente</option>
                            </select>
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
