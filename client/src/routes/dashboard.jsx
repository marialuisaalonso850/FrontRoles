import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import Mapa from '../js/Mapa';
import PortalLayout from '../layout/PortalLayout';
import '../assets/dashboard.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Autenticacion/AutProvider';

const Dashboard = () => {
  const { getUser } = useAuth();
  const [parqueaderos, setParqueaderos] = useState([]);
  const [rol, setRol] = useState("");
  const auth = useAuth();

  useEffect(() => {
    fetchParqueaderos();
    fetchUserRole();
  }, [getUser]);

  const fetchParqueaderos = async () => {
    try {
      const res = await axios.get(config.apiUrl);
      setParqueaderos(res.data);
    } catch (error) {
      console.error("Error fetching parqueaderos:", error);
    }
  };

  const fetchUserRole = async () => {
    try {
      const user = getUser();
      if (user) {
        const response = await axios.post(`${config.apiUrl}/user`, { userId: user.id });
        setRol(response.data.rol);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  return (
    <PortalLayout>
      <div>
      </div>
      <div className="posts">
        <h1>Busqueda de parqueaderos</h1>
        <Mapa posts={parqueaderos} />
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Contenido</th>
                <th>Latitud</th>
                <th>Longitud</th>
                <th>Puestos</th>
                <th>info</th>
                <th>puestos</th>
              </tr>
            </thead>
            <tbody>
              {parqueaderos.map((parqueadero) => (
                <tr key={parqueadero._id}>
                  <td>{parqueadero.title}</td>
                  <td>{parqueadero.content}</td>
                  <td>{parqueadero.latitud}</td>
                  <td>{parqueadero.longitud}</td>
                  <td>{parqueadero.puestos}</td>
                  <td>
                    <Link to={`/post/${parqueadero._id}/info`} className="btn btn-primary">
                      Info
                    </Link>
                  </td>
                  <td>
                    <Link to="/Posts" className="btn btn-primary">
                      puesto
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}

export default Dashboard;
