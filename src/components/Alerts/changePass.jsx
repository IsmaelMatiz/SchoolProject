import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../../firebase/CRUD/crudAdmin";
import "../../styles/Popup/Popup.css"

export function ChanchePassword(props) {
    const [prevpass, setPrevPass] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [errorP, setErrorP] = useState(0)
    const navigate = useNavigate()

    async function handleUpdatePass(){
        console.log(props.email)
        console.log(prevpass)
        console.log(password)
        console.log(confirm)
        if (password != confirm) {
            setErrorP(1)
        }else{
            let success = false
                
            success = await ChangePassword(props.email,prevpass,confirm)
            
            console.log("||||||||success 1 de change es: |||||||| "+success)                    
            if(success) {
                    setErrorP(3)
                    setTimeout(() => {
                        navigate("/")
                        window.location.reload()
                    }, 2000)
                }
                else setErrorP(2)
        }
    }

    return (props.trigger) ?(
        <React.Fragment>
        <div className="popup">
            <div className="popup-inner">
                <h4>Se cerrara la sesion al cambiar la clave</h4>
                <form>
                    <label for="exampleInputPassword1" class="form-label">Contraseña Anterior</label>
                    <div class="my-input">
                        <div class="icono"><i class="bi bi-key"></i></div>
                        <input type="password" name="password" class="form-control"  value={prevpass} onChange={e =>{
                            setPrevPass(e.target.value)
                        }}/>
                    </div>
                    <label for="exampleInputPassword1" class="form-label">Nueva Contraseña</label>
                    <div class="my-input">
                        <div class="icono"><i class="bi bi-key"></i></div>
                        <input type="password" name="password" class="form-control"  value={password} onChange={e =>{
                            setPassword(e.target.value)
                        }}/>
                    </div>
                    <label for="exampleInputPassword1" class="form-label">Verificar Nueva Contraseña</label>
                    <div class="my-input">
                        <div class="icono"><i class="bi bi-key-fill"></i></div>
                        <input type="password" name="password" class="form-control"  value={confirm} onChange={e =>{
                            setConfirm(e.target.value)
                        }}/>
                    </div>
                </form>
                {errorP == 1?
                    <div class="alert alert-warning" role="alert">
                        La clave no coincide
                    </div>
                :
                errorP == 2?
                    <div class="alert alert-danger" role="alert">
                        Error al intentar cambiar la clave, verifica la clave anterior
                    </div>
                :
                errorP == 3?
                    <div class="alert alert-success" role="alert">
                        Clave cambiada exitosamente
                    </div>
                :
                <span></span>
                }

                <div className="row">
                  <div className="col">
                    <button className="btn btn-primary"
                    onClick={handleUpdatePass}
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
