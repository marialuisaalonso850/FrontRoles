import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <>
          <header className="principal">
            <div className="container-pri">
              <Link to="/" className="inicio">
                Parking<span className="span">Location.</span>{" "}
              </Link>
            </div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Inicio </Link>
                </li>
                <li>
                  <Link to="/signup">Registro</Link>
                </li>
                <li>
                  <Link to="/ContactUs">Contactos</Link>
                </li>
                <li>
                  <Link to="/Login">Ingreso</Link>
                </li>
              </ul>
            </nav>
          </header>
        </>
        );
    };