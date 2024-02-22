import React from 'react'

export const Projects = () => {
  return (

    <div id="projects" className="projects">
      <div className="priPro">
        <h1 className="selector">
          My projects
        </h1>
        <p className="selectorcontect">
          By information about design the world to the best instructors, heatc
          helping By information
        </p>
      </div>
      {/* Works */}
      <div className="cuadros">
        <div className="cuadrosC">
          <a href="https://incredible-torte-d7ffa3.netlify.app/">
          <img
            src="https://i.ibb.co/F6zNy2M/peliculas.png"
            className="cuadroscontect"
          />
          </a>
        
          <h3 className="bold"> ITV- film platform</h3>
          <p className="boldcon">
          is a platform which gives us the search, filters, 
          description of movies and series, also have their trailer.
          </p>
        </div>
        <div className="cols">
          <div className="colscon">
            <a href="https://fanciful-sorbet-e105cb.netlify.app/">
            <img
              src="https://i.ibb.co/DQPfM3P/telefono.png"
              className="nose"
            />
            </a>
            <h3 className="contenedores">
              IOS app Atastico
            </h3>
          </div>
          <div className="colscon">
            <a href="https://latinlover.netlify.app/">
            <img
              src="https://i.ibb.co/bscC0KB/hoja.png"
              className="nose"
            />
            </a>
            
            <h3 className="contenedores">
            internship project
            </h3>
          </div>
          <div className="colscon">
          <a href="https://rickand-morty-phi.vercel.app/">
          <img
            src="https://i.ibb.co/rwmT0Kq/Rickand-Morty.png"
            className="nose"
          />
          </a>
            
            <h3 className="contenedores">
            Rick and Morty
            </h3>
          </div>
          <div className="colscon">
            <a href="https://legendary-churros-38f3a6.netlify.app/">
            <img
              src="https://i.ibb.co/nMtQQkf/Blueasy.png"
              className="nose"
            />
            </a>
    
            <h3 className="contenedores">
              Blueasy
            </h3>
          </div>
        </div>
      </div>
    </div>


  );
};