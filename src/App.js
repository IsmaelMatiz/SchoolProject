import React from 'react';
import {Routes,Route} from 'react-router-dom';
import './styles/App/App.css';
import Barra from './components/barra/Barra'; 
import { Cuerpo } from './components/cuerpo/Cuerpo';
import Footer from "./components/footer/Footer";
import Pacientes from './components/Tablas/Pacientes';
import InfoP from './components/infoP/InfoP';
import Cumplimiento from './components/infoP/Cumplimiento';
import Deberes from './components/infoP/Deberes'; 
import Evolucion from './components/infoP/Evolucion';
import { Medicos } from './components/Tablas/Medicos';
import { Admins } from './components/Tablas/Admins';
import { RegisterView } from './components/create/Register';
import { DashboardAdmin } from './components/dashboards/dashboardAdmin';
import { DashboardMedico } from './components/dashboards/dashboardMedico';
import { Profile } from './components/Profile/profile';
import { Login } from './components/Login/Login';


function App() {  
  return(
    <div className='App'>
    
      <Barra/>
      <Routes>
        <Route exact path='/' element={<Cuerpo/>} />
        <Route path='/Pacientes' element={<Pacientes/>} />
        <Route path='/Medicos' element={<Medicos/>} />
        <Route path='/Admins' element={<Admins/>} />
        <Route path='/Register' element={<RegisterView/>} />
        <Route path='/Dashboard/admin' element={<DashboardAdmin/>} />
        <Route path='/Dashboard/medico' element={<DashboardMedico/>} />
        <Route path='/InfoP' element={<InfoP/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Cumplimiento' element={<Cumplimiento/>} />
        <Route path='/Deberes' element={<Deberes/>} />
        <Route path='/Evolucion' element={<Evolucion/>} />
        <Route path='/Login' element={<Login/>} />

      </Routes>
      <Footer />
    </div>
  );

}

export default App;
