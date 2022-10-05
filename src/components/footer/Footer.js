import React from 'react'
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer class="pie-pagina">
            <div class="grupo-1">
                <div class="box">
                    <h1>LA SALLE</h1>
                </div>
                <div class="box">
                <h3>MAS INFORMACION SOBRE LA EMPRESA</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque assumenda totam rem, maxime maiores eveniet illo voluptate tenetur, consectetur est quidem fuga? Autem odio sint, earum laudantium rem harum est!</p>
                </div>
                <div class="box">
                <h3>Siguenos en</h3>
                    <div class="red-social">
                        <a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-square"></i></a>
                        <a href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="grupo-2">
                <small>&copy; 2022 <b>La Salle</b> - Todos los Dereches Reservados</small>
            </div>
        </footer>
    </div>

  );
};

export default Footer
