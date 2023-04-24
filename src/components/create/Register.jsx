import React from "react";
import "../../styles/Register/Register.css"

export function RegisterView(){

    return(
        <React.Fragment>
            <div class="mx-auto card">
                <div class="card-body">
                    <h5 class="card-title">Registrate</h5>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo electrónico</label>
                            <div class="my-input">
                                <div class="icono"><i class=" bi bi-envelope-fill"></i></div>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div id="emailHelp" class="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key"></i></div>
                                <input type="password" class="form-control"  />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Verificar Contraseña</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key-fill"></i></div>
                                <input type="password" class="form-control"/>
                            </div>
                        </div>
                        <div class="my-input">
                            <div class="icono"><i class="bi bi-person-circle"></i></div>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Cual es tu rol?</option>
                                <option value="1">Admin</option>
                                <option value="2">Medico</option>
                                <option value="3">Paciente</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
