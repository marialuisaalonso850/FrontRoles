/// Footer.js


import '../assets/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">ParkingLocation</div>

        </div>

        <div className="footer-section">
          <h3 className='contactanos'>Contactanos</h3>
          <section className="icons">
            <div className='infop'>
              <span className='icon'><img src='https://i.ibb.co/CmqR8v9/correo-electronico.png' alt="" className='a-icon' /></span>
              <h4 className='info1'>support@parkinglocation.com</h4>
            </div>
            <div className='infop'>
              <span className='icon'><img src='https://i.ibb.co/7y5n39D/boton-de-simbolo-de-telefono.png' alt="" className='a-icon' /></span>
              <h4 className='info1'>+57 314 844 8534</h4>
            </div>
          </section>
        </div>

        <div className="footer-section">
          <h3 className='contactanos'>Siguenos</h3>
          <div className="footer-social">
            <a href="#facebook"><img src='https://i.ibb.co/Jj4GKf5/facebook.png' alt="" className='b-icon' /></a>
            <a href="#twitter"><img src='https://i.ibb.co/h2RPYWK/gorjeo.png' alt="" className='b-icon' /></a>
            <a href="#linkedin"><img src='https://i.ibb.co/54Bx5Gb/logotipo-de-linkedin.png' alt="" className='b-icon' /></a>
            <a href="#instagram"><img src='https://i.ibb.co/9pmt92D/instagram.png' alt="" className='b-icon' /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
