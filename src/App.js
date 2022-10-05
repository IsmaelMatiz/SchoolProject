import React, { useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import './App.css';
import Portada from "./components/portada/Portada";
import Barra from './components/barra/Barra'; 
import Cuerpo from "./components/cuerpo/Cuerpo";
import Footer from "./components/footer/Footer";


import Home from "./screens/Home";
import Login from "./screens/Login";
import firebaseApp from "./firebase/firebaseConfi";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData fianl", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return <>
  <div className='App'>
      <Barra />
      <Routes>
        <Route exact path='/' element={<Cuerpo/>} />
        <Route path='/Portada' element={<Portada/>} />
        <Route path='/Cuerpo' element={<Cuerpo/>} />
        <Route path='/login' element={<Login/>} />
        
      </Routes>
      <Footer />
    </div>
  
  
  </>;

  /*return (
    <div className='App'>
      <Barra />
      <Routes>
        <Route exact path='/' element={<Cuerpo/>} />
        <Route path='/Portada' element={<Portada/>} />
        <Route path='/Cuerpo' element={<Cuerpo/>} />
        <Route path='/registro' element={<Registro/>} />
        
      </Routes>
      <Footer />
    </div>
  );*/
  
}

export default App;
