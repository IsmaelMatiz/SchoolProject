import {onAuthStateChanged} from "firebase/auth";
import React, {useState} from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import {auth, userExists} from "../firebase/firebaseConfi";
import { useNavigate } from "react-router-dom";


//Esta funcion redirige a la pagina requerida dependiendo 
//si el usuario esta resgistrado o no
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

export const infoLoggedUser = auth.currentUser
