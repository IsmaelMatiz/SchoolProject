import {onAuthStateChanged} from "firebase/auth";
import React, {useState} from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import {auth, userExists} from "../firebase/firebaseConfi";
import { useNavigate } from "react-router-dom";
import { getAdmin } from "./CRUD/crudAdmin";
import { getADoctor } from "./CRUD/crudMedicos";
import { getAPatient } from "./CRUD/crudPacientes";




/*export default function authProvider(){
    //redireccionar a los usuarios
    const navigate = useNavigate();

    // Saber si el usuario esta autenticado y registrado
    useEffect(
        () => {
            onAuthStateChanged(auth,handleUserStateChanged);
        }, []
    );
    
    async function handleUserStateChanged(user){
        //Mostar algo dependiendo de si esta verificado o no
        if(user && await userExists(user.uid)) { //dashboard cuando totalmente verificado
            navigate('/dashboard-admin')
        }
        else if (user){//
            navigate('/choose-username')
        }
        else {
            navigate('/login')
        }
    }
    
}*/

//Esta funcion redirige a la pagina requerida dependiendo 
//si el usuario esta resgistrado o no
export default async function AuthProvider(){
    const whoIsLogged = infoLoggedUser() ? infoLoggedUser().uid : "Nobody" //Id de quien esta Logueado
    const navigate = useNavigate()
    async function redirectUser(user) {
        console.log("user is: "+ user)
        switch (user) {
            case "Nobody":
                navigate("/")
                break;
            
            case "Admin":
                navigate("/Admins")
                break;
            case "Medico":
                navigate("/Medicos")
                break;
            case "Paciente":
                navigate("/Pacientes")
                break;
            default:
                break;
        }
    }
    redirectUser(await userType(whoIsLogged))
}

//Determinar que clase de usuario es, Admin, Medico o Paciente?
export async function userType(id){
    if(id == "Nobody"){
        return "Nobody"
    }
    const isAdmin = await getAdmin(id)
    const isDoctor = await getADoctor(id)
    const isPatient = await getAPatient(id)

    if(isAdmin.length == 1){
        return "Admin"
    }else if(isDoctor.length == 1){
        return "Medico"
    }else if(isPatient.length == 1){
        return "Paciente"
    }
}


export const infoLoggedUser = ()=>{
    const infoUser = auth.currentUser
    return infoUser
}


