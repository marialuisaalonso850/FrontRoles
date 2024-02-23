import puestos from "../puestos.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../assets/Reserva.css'; 

const Reserva = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reserva, setReserva] = useState({
      nombre: "",
      telefono: "",
      vehiculo: "",
      ano: "",
      fecha: "",
      hora: "",
  });
  

  useEffect(() => {
    if (!id) return;
    const fetchReserva = async () => {
      const { data } = await axios.get(`${puestos.apiUrl}/${id}`);
      setReserva(data);
    };
    fetchReserva();
  }, [id]);

  const handleChange = (e) => {
    const reservaClone = { ...reserva };
    reservaClone[e.target.name] = e.target.value;
    setReserva(reservaClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id); 
    if (id === "new") {
      await axios.post(puestos.apiUrl, reserva);
      return navigate("/reservas");
    } else {
      await axios.put(`${puestos.apiUrl}/${id}`, reserva);
      return navigate("/reservas");
    }
  };
  return (
    <div className="post__wrapper">
      <div className="container">
      <div className="post-container">
          <div className="post-image">
            {/* Add your image source and styling here */}
            <img
              src="https://i.pinimg.com/736x/8f/9f/24/8f9f249794532398106f198c6e4f87f8.jpg"
              alt="Post Image"
              className="image"
            />
            </div>
        <form className="post">
          <input
            type="text"
            placeholder="Nombre..."
            name="nombre"
            value={reserva.nombre}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="telefono..."
            name="telefono"
            value={reserva.telefono}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="vehiculo..."
            name="vehiculo"
            value={reserva.vehiculo}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="año..."
            name="año"
            value={reserva.año}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="fecha..."
            name="fecha"
            value={reserva.fecha}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Hora..."
            name="hora"
            value={reserva.hora}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            {id === "new" ? "agregar" : "Update"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Reserva;