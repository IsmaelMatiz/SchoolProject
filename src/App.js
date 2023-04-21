import React, { useState } from 'react';
import {Routes,Route, Form, Navigate} from 'react-router-dom';
import './App.css';
import Barra from './components/barra/Barra'; 
import { Cuerpo } from './components/cuerpo/Cuerpo';
import Footer from "./components/footer/Footer";
import Pacientes from './components/medico/Pacientes';
import Edit from './components/edit/Edit';
import EditMedico from './components/edit/EditMedico';
import Create from './components/create/Create';
import Medico from './components/paciente/Medico';
import InfoP from './components/infoP/InfoP';
import Cumplimiento from './components/infoP/Cumplimiento';
import Deberes from './components/infoP/Deberes'; 
import Evolucion from './components/infoP/Evolucion';
import { Medicos } from './components/medico/Medicos';
import { Admins } from './components/medico/Admins';
import { CreatePatientView } from './components/create/CreatePaciente';
import { CreateDoctorView } from './components/create/CreateMedico';


function App() {  
  return(
    <div className='App'>
    
      <Barra/>
      <Routes>
        <Route exact path='/' element={<Cuerpo/>} />
        <Route path='/Pacientes' element={<Pacientes/>} />
        <Route path='/Medicos' element={<Medicos/>} />
        <Route path='/Admins' element={<Admins/>} />
        <Route path='/Edit/:id' element={<Edit/>} />
        <Route path='/EditMedico/:id' element={<EditMedico/>} />
        <Route path='/Create' element={<Create/>} />
        <Route path='/CrearPaciente' element={<CreatePatientView/>} />
        <Route path='/CrearMedico' element={<CreateDoctorView/>} />
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
