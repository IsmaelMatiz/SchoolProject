import React from 'react'
import "./Cuerpo.css";
import Medico from "../../Media/Medico.jpg";

import Portada from '../portada/Portada';
const Cuerpo = () => {
  return (
    <>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://ieqfb.com/wp-content/uploads/Diseño-sin-título-11.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://d31g6oeq0bzej7.cloudfront.net/Assets/image/jpeg/a621b5c6-920b-471f-b10e-eb69b08a9259.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://www.lasalle.edu.co/wcm/connect/3a02e518-5563-472e-ad89-49d86dd24314/1.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-3a02e518-5563-472e-ad89-49d86dd24314-nlSCr2s" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
<Portada/>
    </>
  );
};

export default Cuerpo
