import React, { useState } from 'react';
import {Routes,Route, Form, Navigate} from 'react-router-dom';
import './App.css';
import Portada from "./components/portada/Portada";
import Barra from './components/barra/Barra'; 
import Cuerpo from "./components/cuerpo/Cuerpo";
import Footer from "./components/footer/Footer";
import Usuarios from "./components/usuarios/Usuarios";
import Pacientes from './components/medico/Pacientes';
import Edit from './components/edit/Edit';
import EditMedico from './components/edit/EditMedico';
import Create from './components/create/Create';
import Medico from './components/paciente/Medico';
import InfoP from './components/infoP/InfoP';
import Cumplimiento from './components/infoP/Cumplimiento';
import Deberes from './components/infoP/Deberes'; 
import Evolucion from './components/infoP/Evolucion';

import { getFirestore, doc, getDoc } from 'firebase/firestore';

import firebaseApp from './firebase/firebaseConfi';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const auth = getAuth(firebaseApp) 
const firestore = getFirestore(firebaseApp)

function App() {  

  const [user, setUser] = useState(null);

  async function getRol(uid){
    const docuRef = doc (firestore, `medicos/${uid}`)
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseRol(usuarioFirebase){
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData final", userData);
    });
  }

  onAuthStateChanged(auth,(usuarioFirebase)=>{
    if(usuarioFirebase){
      
      if(!user){
        setUserWithFirebaseRol(usuarioFirebase);
      }

    } else{
      setUser(null);
    }
  })

  return(
    <div className='App'>
    
      <Barra/>
      <Routes>
        <Route exact path='/Cuerpo' element={<Cuerpo/>} />
        <Route path='/Portada' element={<Portada/>} />
        <Route path='/Usuarios' element={<Usuarios/>} />
        <Route path='/Pacientes' element={<Pacientes/>} />
        <Route path='/Edit/:id' element={<Edit/>} />
        <Route path='/EditMedico/:id' element={<EditMedico/>} />
        <Route path='/Create' element={<Create/>} />
        <Route path='/Medico' element={<Medico/>} />
        <Route path='/InfoP' element={<InfoP/>} />
        <Route path='/Cumplimiento' element={<Cumplimiento/>} />
        <Route path='/Deberes' element={<Deberes/>} />
        <Route path='/Evolucion' element={<Evolucion/>} />
      </Routes>
      <Footer />
    </div>
  );

}

export default App;
