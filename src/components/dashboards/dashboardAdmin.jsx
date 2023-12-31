import React from "react";
import { Medicos } from "../Tablas/AdminyMedico/Medicos";
import Pacientes from "../Tablas/Pacientes/Pacientes";
import "../../styles/dashBoard/dashboard.css"
import "../../styles/Register/Register.css"
import AuthProvider, { userType } from "../../firebase/authProvider";
import { getAllDoctors } from "../../firebase/CRUD/crudMedicos";
import { getAllPatients } from "../../firebase/CRUD/crudPacientes";
import { useState } from "react";
import { useEffect } from "react";
import { Assignments } from "../Tablas/AssignMyP/Assignments";
import { AddToDBAssignment } from "../../firebase/CRUD/crudAsginacion";
import { Link, useNavigate } from "react-router-dom";
import { TableTherapies } from "../Tablas/Therapies/LinksTherapies";
import { getAllTherapies } from "../../firebase/CRUD/crudLinksTerapias";
import { AddToDBAssignmentTerapy } from "../../firebase/CRUD/crudAsignacionTerapias";
import { AssigmentsTherapies } from "../Tablas/AssignT/AssigmentsTherapies";
import { auth } from "../../firebase/firebaseConfi";


export function DashboardAdmin(){
    const navigate = useNavigate()//Ayuda a redireccionar al usuario en caso de no estar autenticado

    const [allDoctors,setDoctors] = useState([])
    const [allTherapies,setTherapies] = useState([])
    const [allPatients, setPatients] = useState([])

    async function setSelects(){
        setDoctors(await getAllDoctors()) 
        setPatients(await getAllPatients())
        setTherapies(await getAllTherapies())
    }

    async function registAssigment() {
        //Primero Obtener la Info
        let infoDoctor = document.getElementById("docInfo").value
        let infoPaciente = document.getElementById("pacienteInfo").value
        
        if (infoDoctor == "Elige el Medico?" || infoPaciente == "Elige el paciente?") {
            alert("Porfavor elige un medico y un paciente")
        }else{
            await AddToDBAssignment(infoDoctor,infoPaciente)

        setTimeout(() => {
            window.location.reload()
        }, 4000)
        }

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
                if (userTy != "Admin") {
                    setTimeout(() => {
                        navigate("/")
                        window.location.reload()
                    }, 100);
                }
            }
          }
        )
      },[])

    useEffect(()=>{
        setSelects()
    },[])

    return(
        <React.Fragment>
            <div className="create-new-prof">
                <div className="row">
                    <h1>Crear un nuevo perfil</h1>
                        <Link to={"/Register"}> <button className="btn btn-primary">Crear</button> </Link>
                </div>
            </div>

            <div className="row">
                <div className="col my-col">
                    <h3>Doctores</h3>
                    <Medicos />
                </div>

                <div className="col my-col">
                    <h3>Pacientes</h3>
                        <Pacientes />
                </div>            
            </div>
            
                <div className="asign">
                    <div className="row">
                        <h1>Asignar Medico a un Paciente</h1>
                        <div className="col">
                                <div class="my-input">
                                            <div class="icono"><i class="bi bi-person-circle"></i></div>
                                            <select class="form-select" id="docInfo" aria-label="Default select example">
                                                <option selected>Elige el Medico?</option>
                                                {
                                                    allDoctors.map(
                                                        doctor =>(
                                                            <option key={doctor.id} value={doctor.id}>{doctor.email}</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                </div>
                                <div className="col">
                                <div class="my-input">
                                            <div class="icono"><i class="bi bi-person-circle"></i></div>
                                            <select class="form-select" id="pacienteInfo" aria-label="Default select example">
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
                            <button onClick={registAssigment} class="btn my-btn btn-primary">Enviar</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col my-col">
                        <Assignments />
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
