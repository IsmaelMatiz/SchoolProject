import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Popup/Popup.css"

export function ConfirmCrudAction(props) {

    const navigate = useNavigate()

    function handleAccept() {
        setTimeout(() => {
            props.actionCrud()
        }, 1000)
    }

    return (props.trigger) ?(
        <React.Fragment>
        <div className="popup">
            <div className="popup-inner">
                <h4>Para proseguir con la accion porfavor ingrese las claves</h4>
                <form>
                    <label for="exampleInputPassword1" class="form-label">Contraseña Usuario Logueado</label>
                    <div class="my-input">
                        <div class="icono"><i class="bi bi-key"></i></div>
                        <input type="password" name="password" class="form-control" onChange={e =>{
                            props.setPasswordSup(e.target.value)
                        }}/>
                    </div>
                    <label for="exampleInputPassword1" class="form-label">Contraseña Usuario a ser alterado</label>
                    <div class="my-input">
                        <div class="icono"><i class="bi bi-key-fill"></i></div>
                        <input type="password" name="password" class="form-control" onChange={e =>{
                            props.setPasswordAff(e.target.value)
                        }}/>
                    </div>
                </form>

                <div className="row">
                  <div className="col">
                    <button className="btn btn-primary"
                    onClick={handleAccept}
                    >Aceptar</button>
                  </div>
                
                <div className="col">
                  <button className="btn btn-danger"
                    onClick={()=>{
                      props.setTrigger(false)
                    }}
                    >Cancelar</button>
                  </div>
                </div>
            </div>
        </div>
      </React.Fragment>
    ):""
}
