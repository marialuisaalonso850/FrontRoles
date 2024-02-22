import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import puestos from "../puestos.json";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
} from 'reactstrap';
import Puestos from "./puestos";
import '../assets/Posts.css';
import PortalLayout from "../layout/PortalLayout";


const Reservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  


  const fetchReservas = async () => {
    const res = await axios.get(puestos.apiUrl);
    setReservas(res.data);
  };

  useEffect(() => {
    fetchReservas();
  }, []);


  const handleDelete = async (reserva) => {
    setReservas(reservas.filter((p) => p._id !== reserva._id));
    await axios.delete(`${puestos.apiUrl}/${reserva._id}`);
  };


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
         <PortalLayout>
    <div className="posts">
  
      <div className="container">
      <Link to="/Posts">
          <Button color="primary">Regresar</Button>
        </Link>
        <button onClick={() => navigate("/reserva/new")} className="btn btn-primary mb-4">
          nueva reserva
        </button>
        
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>telefono</th>
              <th>vehiculo</th>
              <th>año</th>
              <th>fecha</th>
              <th>hora</th>
              
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva._id}>
                <td> {reserva.nombre} </td>
                <td> {reserva.telefono} </td>
                <td> {reserva.vehiculo} </td>
                <td> {reserva.año} </td>
                <td> {reserva.fecha} </td>
                <td> {reserva.hora} </td>
                
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
                    onClick={() => handleDelete(reserva)}
                    className="btn btn-danger"
                  >
                    cancelar reserva
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        
        </table>
        <button onClick={toggleModal} className="btn btn-primary mb-4">
          Reservar Asiento
        </button>
      </div>
      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <button className="close-button" onClick={toggleModal}>
              Close
            </button>
            <Puestos />
          </div>
        </div>
      )}
   
    </div>
      </PortalLayout>
        
      
    
  );
};

export default Reservas;
