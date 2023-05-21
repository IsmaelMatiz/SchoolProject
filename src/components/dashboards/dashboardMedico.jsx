import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAssignment } from "../../firebase/CRUD/crudAsginacion"
import { infoLoggedUser, userType } from "../../firebase/authProvider"
import { useEffect } from "react"
import { TableItemtPatient } from "../Tablas/Pacientes/TableItemPatient"
import Pacientes from "../Tablas/Pacientes/Pacientes"
import { getAPatient } from "../../firebase/CRUD/crudPacientes"
import { auth } from "../../firebase/firebaseConfi"

export function DashboardMedico() {
    const navigate = useNavigate()//Ayuda a redireccionar al usuario en caso de no estar autenticado

    const [mispacientes, setMisPacientes ] = useState( [] )

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
        </React.Fragment>
    )
}
