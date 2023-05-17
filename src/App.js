import React from 'react';
import {Routes,Route} from 'react-router-dom';
import './styles/App/App.css';
import Barra from './components/barra/Barra'; 
import { Cuerpo } from './components/cuerpo/Cuerpo';
import Footer from "./components/footer/Footer";
import { Seguimiento } from './components/infoP/Seguimiento';
import { Admins } from './components/Tablas/AdminyMedico/Admins';
import { RegisterView } from './components/create/Register';
import { DashboardAdmin } from './components/dashboards/dashboardAdmin';
import { DashboardMedico } from './components/dashboards/dashboardMedico';
import { Profile } from './components/Profile/profile';
import { Login } from './components/Login/Login';
import { Progreso } from './components/infoP/Progreso';
import { Terapias } from './components/infoP/Terapias';
import { HistoriasC } from './components/infoP/Hisorias';
import { RegisterTherapy } from './components/create/RegisterAndEditTerapy';


function App() {  
  return(
    <div className='App'>
    
      <Barra/>
      <Routes>
        <Route exact path='/' element={<Cuerpo/>} />
        <Route path='/Admins' element={<Admins/>} />
        <Route path='/Register' element={<RegisterView/>} />
        <Route path='/RegisterTherapy' element={<RegisterTherapy/>} />
        <Route path='/Dashboard/admin' element={<DashboardAdmin/>} />
        <Route path='/Dashboard/medico' element={<DashboardMedico/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Seguimiento' element={<Seguimiento/>} />
        <Route path='/Progreso' element={<Progreso/>} />
        <Route path='/Terapias' element={<Terapias/>} />
        <Route path='/Historia-Clinica' element={<HistoriasC/>} />
        <Route path='/Login' element={<Login/>} />

      </Routes>
      <Footer />
    </div>
  );

}

export default App;
