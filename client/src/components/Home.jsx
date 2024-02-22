
import DefaultLayout from "../layout/DefaultLayout";
import React , {useState, useEffect}from "react";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import TrackVisibility from 'react-on-screen';
//import { Projects } from './project';
import Footer from './Footer'


export const Home = () => {

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "somos ParkingLocation" ];
 

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  
  return (
    <div>
     <  DefaultLayout >
     <section className="banner" id="home">
      <div className="Container">
        <div className="aligh-items-center">
          <div className="intento">
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Bienvenido Usuario</span>
                <h1>{`Hola! Aventureros `} <span className="txt-rotate"  data-rotate='[ "Somos ParkingLocation" ]'><span className="wrap">{text}</span></span></h1>
                  <p>¡Bienvenido a ParkingLocation! Encuentra, reserva y simplifica tu estacionamiento en segundos. Explora una variedad de parqueaderos cercanos, filtra por precios, horarios y servicios, todo para hacer tu vida más fácil. Simplifica tu rutina de estacionamiento con nosotros.</p>
                  <button onClick={() => console.log('connect')}>Ver video <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </div>
          <div className="imagen">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src="https://i.ibb.co/wQYC7K6/images-jpg-Photoroom-png-Photoroom.png" alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    
    </DefaultLayout>
    </div>
  )
}

export default Home