import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AddToDBTherapy, updateATherapy } from "../../firebase/CRUD/crudLinksTerapias";


export function RegisterTherapy() {
    const[id,setId] = useState("")
    const[titulo,setTitulo] = useState("")
    const[linkt,setLinkT] = useState("")
    const [success, setSuccess] = useState(0)//dependiendo el numero notifica al usuario de si todo salio bien
    //Esta ayudara proximamente a obtener la info desde la pagina anterior cuando se invoque esta pagina
    let actionToDo = useLocation()

    async function registerTherapy(e) {
        e.preventDefault()

        let successRegister = true
        let titulo = e.target.titulo.value
        let linkt = e.target.linkt.value

        if (titulo == "" || linkt == "") {
            setSuccess(2)
            return
        }

        successRegister = await AddToDBTherapy(titulo,linkt)

        successRegister ? setSuccess(1) : setSuccess(2)
    }

    async function editTherapy(e) {
        e.preventDefault()

        let successEdit = true

        if (titulo == "" || linkt == "") {
            setSuccess(2)
            return
        }

        successEdit = await updateATherapy(id,titulo,linkt)

        successEdit ? setSuccess(1) : setSuccess(2)
    }

    //este useEffect trae la informacion del link a editar
    useEffect(()=>{
        if(actionToDo.state.action == "edit"){
            setId(actionToDo.state.id)
            setTitulo(actionToDo.state.title)
            setLinkT(actionToDo.state.linkt)
        }
    },[])
    
    return(
        <React.Fragment>
            <div class="mx-auto card">
                <div class="card-body">
                    {actionToDo.state.action == "create"?
                        <h5 class="card-title">Registra una nueva Terapia</h5>
                    :
                        <h5 class="card-title">Editar Terapia</h5>
                    }
                    <form onSubmit={registerTherapy}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Titulo Terapia</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person"></i></div>
                                <input type="text" class="form-control" name="titulo" aria-describedby="emailHelp" 
                                onChange={e => setTitulo(e.target.value)} value={titulo}/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Link Terapia</label>
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person"></i></div>
                                <input type="text" class="form-control" name="linkt" aria-describedby="emailHelp" 
                                onChange={e => setLinkT(e.target.value)} value={linkt}/>
                            </div>
                        </div>
                        {actionToDo.state.action == "create"?
                            <button type="submit" class="btn my-btn btn-primary">Registrar</button>
                        :
                            <span></span>
                        }
                    </form>
                        {actionToDo.state.action == "create"?
                            <span></span>
                        :
                            <button onClick={editTherapy} class="btn my-btn btn-primary">Editar</button>
                        }
                </div>
            </div>
            {
                success == 0? <span></span> 
                : success == 1? 
                actionToDo.state.action == "create"?
                    <div class="alert alert-success" role="alert">
                        Terapia creada exitosamente
                    </div>
                :
                <div class="alert alert-success" role="alert">
                    Terapia editada exitosamente
                </div>
              : success == 2? 
                    actionToDo.state.action == "create"?
                    <div class="alert alert-success" role="alert">
                        Error al cear terapia intente mas tarde
                    </div>
                    :
                    <div class="alert alert-success" role="alert">
                        Error al editar terapia intente mas tarde
                    </div>
                : <span></span>
            }
        </React.Fragment>
    )
}
