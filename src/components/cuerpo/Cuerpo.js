import React from 'react'
import "./Cuerpo.css";


const Cuerpo = () => {
  return (
    <>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://ieqfb.com/wp-content/uploads/Diseño-sin-título-11.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://d31g6oeq0bzej7.cloudfront.net/Assets/image/jpeg/a621b5c6-920b-471f-b10e-eb69b08a9259.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://www.lasalle.edu.co/wcm/connect/3a02e518-5563-472e-ad89-49d86dd24314/1.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-3a02e518-5563-472e-ad89-49d86dd24314-nlSCr2s" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    </>
  );
};

export default Cuerpo
