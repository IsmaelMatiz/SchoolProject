import React from "react";
import { Medicos } from "../Tablas/Medicos";
import Pacientes from "../Tablas/Pacientes";
import "../../styles/dashBoard/dashboard.css"
import "../../styles/Register/Register.css"
import AuthProvider from "../../firebase/authProvider";
import { getAllDoctors } from "../../firebase/CRUD/crudMedicos";
import { getAllPatients } from "../../firebase/CRUD/crudPacientes";
import { useState } from "react";
import { useEffect } from "react";
import { async } from "@firebase/util";


export function DashboardAdmin(){
    AuthProvider()

    const [allDoctors,setDoctors] = useState([])
    const [allPatients, setPatients] = useState([])

    async function setSelects(){
        setDoctors(await getAllDoctors()) 
        setPatients(await getAllPatients())
    }
    
    useEffect(()=>{
        setSelects()
    },[])

    return(
        <React.Fragment>
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
                                            <select class="form-select" name="rol" aria-label="Default select example">
                                                <option selected>Elige el Medico?</option>
                                                {
                                                    allDoctors.map(
                                                        doctor =>(
                                                            <option value={doctor.id}>{doctor.email}</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                </div>
                                <div className="col">
                                <div class="my-input">
                                            <div class="icono"><i class="bi bi-person-circle"></i></div>
                                            <select class="form-select" name="rol" aria-label="Default select example">
                                                <option selected>Elige el paciente?</option>
                                                {
                                                    allPatients.map(
                                                        patient =>(
                                                            <option value={patient.id}>{patient.email}</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                </div>
                            <button type="submit" class="btn my-btn btn-primary">Enviar</button>
                    </div>
                </div>
        </React.Fragment>
    )
}
