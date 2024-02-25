import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import puestos from "../puestos.json";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
} from 'reactstrap';

import '../assets/Posts.css';

const Reservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);


  const fetchReservas = async () => {
    const res = await axios.get(puestos.apiUrl);
    setReservas(res.data);
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleDelete = async (reserva) => {
    setReservas(reservas.filter((p) => p._id !== reserva._id));
    await axios.delete(`$\{puestos.apiUrl}/${reserva._id} `);
  };

  

  return (
    <div className="posts">
      <div className="container">
        <Link to="/Dashboard">
          <Button color="primary">Regresar</Button>
        </Link>
       
        
        <table className="table">
          <thead>
            <tr >
              <th>fecha</th>              
              <th>Tiempo</th>
              <th>nombre</th>             
              <th>numero</th>
              <th>puesto</th>
             
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva._id}>
                <td> {reserva.date} </td>
                <td> {reserva.time} </td>
                <td> {reserva.nombre} </td>
                <td> {reserva.telefono} </td>
                <td> {reserva.puestos} </td>
                
                <td>
                  <button
                    onClick={() => navigate(`/reserva/${reserva._id}`)}
                    className="btn btn-primary"
                  >
                    editar reserva
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(reserva);
                    }}
                    className="btn btn-danger"
                  >
                    cancelar reserva
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservas;
