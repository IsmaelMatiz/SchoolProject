import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAssignment } from "../../firebase/CRUD/crudAsginacion"
import { infoLoggedUser, userType } from "../../firebase/authProvider"
import { useEffect } from "react"
import { TableItemtPatient } from "../Tablas/Pacientes/TableItemPatient"
import Pacientes from "../Tablas/Pacientes/Pacientes"
import { getAllPatients, getAPatient } from "../../firebase/CRUD/crudPacientes"
import { auth } from "../../firebase/firebaseConfi"
import { TableTherapies } from "../Tablas/Therapies/LinksTherapies"
import { getAllTherapies } from "../../firebase/CRUD/crudLinksTerapias"
import { AssigmentsTherapies } from "../Tablas/AssignT/AssigmentsTherapies"
import { AddToDBAssignmentTerapy } from "../../firebase/CRUD/crudAsignacionTerapias"

export function DashboardMedico() {
    const navigate = useNavigate()//Ayuda a redireccionar al usuario en caso de no estar autenticado

    const [mispacientes, setMisPacientes ] = useState( [] )
    const [allTherapies,setTherapies] = useState([])
    const [allPatients, setPatients] = useState([])

    async function setSelects(){
        setPatients(await getAllPatients())
        setTherapies(await getAllTherapies())
    }

    async function registTherapyAssingment() {
        //Primero Obtener la Info
        let infoTherapy = document.getElementById("therapyInfo").value
        let infoPaciente = document.getElementById("pacienteInfoTherapy").value
        if (infoTherapy == "Elige la terapia?" || infoPaciente == "Elige el paciente?") {
            alert("Por favor elige una terapia y un paciente")
        }
        else{
            await AddToDBAssignmentTerapy(infoTherapy,infoPaciente)
            setTimeout(() => {
                window.location.reload()
            }, 4000)
        }
    }

    async function getPatients(){
        const myPatients = []
        
        const idsMyPatients = await getAssignment(await infoLoggedUser().uid,"id_doctor")

        idsMyPatients.forEach(async(assignment)=>{
            const infoPatients = await getAPatient(assignment.id_paciente)
            myPatients.push(infoPatients[0])
        })

        
        setTimeout(() => {
            setMisPacientes(myPatients)
        }, 4000)
        

        console.log("Pacientes es: ")
        myPatients.map((paciente)=>{
            paciente.forEach((t)=>{
                console.log(t.id)
                console.log(t.nombre)
            })
        })
    }

    // Traemos los pacientes del medico al inicio
    useEffect(() =>{
        getPatients()
        setSelects()
    }, [] )

    useEffect(()=>{
        auth.onAuthStateChanged(
          async(user)=>{
            if (!user){
            setTimeout(() => {
                navigate("/")
                window.location.reload()
            }, 100);
            }else{
                let userTy = await userType(auth.currentUser.uid)
                if (userTy != "Medico") {
                    setTimeout(() => {
                        navigate("/")
                        window.location.reload()
                    }, 100);
                }
            }
          }
        )
      },[])
    return(
        <React.Fragment>
            <div className="create-new-prof">
                <div className="row">
                    <h1>Crear un nuevo perfil</h1>
                        <Link to={"/Register"}> <button className="btn btn-primary">Crear</button> </Link>
                </div>
            </div>

            <div className="col my-col-pacientes-med">
                    <h3>Todos los Pacientes</h3>
                    <Pacientes />
            </div>

            <div className="col my-col-pacientes-med">
                    <h3>Mis pacientes asignados</h3>
                    <div className='container'>
                      <div className='row'>
                        <div className='col'>
                          <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className='table my-table table-hover'>
                            <thead>
                                <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Status</th>
                                <th>Acciones</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                { mispacientes.map( (paciente) =>(
                                        <TableItemtPatient
                                        key={paciente.id}
                                        id={paciente.id}
                                        nombre={paciente.nombre}
                                        apellido={paciente.apellido}
                                        email={paciente.email}
                                        status={paciente.status}
                                        />

                                ))}
                            </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>  
            </div>
            <div className="create-new-prof">
                    <div className="row">
                        <h1>Crear un nuevo Link</h1>
                            <Link to={"/RegisterTherapy"}
                            state={{
                                action:"create"
                            }}
                            > <button className="btn btn-primary">Crear</button> </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col my-col">
                        <TableTherapies />
                    </div>
                </div>

                <div className="asign">
                    <div className="row">
                        <h1>Asignar link de terapia a un Paciente</h1>
                        <div className="col">
                                <div class="my-input">
                                            <div class="icono"><i class="bi bi-person-circle"></i></div>
                                            <select class="form-select" id="therapyInfo" aria-label="Default select example">
                                                <option selected>Elige la terapia?</option>
                                                {
                                                    allTherapies.map(
                                                        therapy =>(
                                                            <option key={therapy.id} value={therapy.id}>{therapy.titulo_terapia}</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                </div>
                                <div className="col">
                                <div class="my-input">
                                            <div class="icono"><i class="bi bi-person-circle"></i></div>
                                            <select class="form-select" id="pacienteInfoTherapy" aria-label="Default select example">
                                                <option selected>Elige el paciente?</option>
                                                {
                                                    allPatients.map(
                                                        patient =>(
                                                            <option key={patient.id} value={patient.id}>{patient.email}</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                </div>
                            <button onClick={registTherapyAssingment} class="btn my-btn btn-primary">Enviar</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col my-col">
                        <AssigmentsTherapies/>
                    </div>
                </div>
        </React.Fragment>
    )
}
