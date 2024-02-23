import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CalendarComponent = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedPuestos, setSelectedPuestos] = useState([]);

  // Cargar puestos seleccionados desde el almacenamiento local al inicio
  useEffect(() => {
    const storedSelectedPuestos = localStorage.getItem('selectedPuestos');
    if (storedSelectedPuestos) {
      setSelectedPuestos(JSON.parse(storedSelectedPuestos));
    }
  }, []);

  // Guardar puestos seleccionados en el almacenamiento local cuando cambien
  useEffect(() => {
    localStorage.setItem('selectedPuestos', JSON.stringify(selectedPuestos));
  }, [selectedPuestos]);

  const handleDateChange = date => {
    setDate(date);
  };

  const handlePuestoSelect = (puesto) => {
    // Si el puesto ya está seleccionado, lo quitamos del array, de lo contrario lo añadimos
    if (selectedPuestos.includes(puesto)) {
      setSelectedPuestos(selectedPuestos.filter(item => item !== puesto));
    } else {
      setSelectedPuestos([...selectedPuestos, puesto]);
    }
  };

  const handleSubmit = async () => {
    // Aquí se actualiza el campo lugarDisponible según los puestos seleccionados
    const reservationData = {
      date: date,
      time: time,
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      lugaresSeleccionados: selectedPuestos
    };

    try {
      const response = await axios.post('https://parqueaderorolesback.onrender.com/api/reserva', reservationData);
      console.log('Reserva creada:', response.data);
      navigate("/reservas");
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  return (
    <div className="calendar-container">
      <Calendar onChange={handleDateChange} value={date} className="react-calendar" />
      <p className="selected-date">Fecha seleccionada: {date.toDateString()}</p>
      <input type="time" value={time} onChange={e => setTime(e.target.value)} className="input-field" />
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} className="input-field" />
      <input type="text" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} className="input-field" />
      <input type="number" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} className="input-field" />
      <div>
        <p>Seleccione puestos:</p>
        {[1, 2, 3, 4, 5, 6 ,7, 8, 9, 10].map((puesto, index) => (
          <button
            key={index}
            onClick={() => handlePuestoSelect(puesto)}
            className="puesto-button"
            style={{ backgroundColor: selectedPuestos.includes(puesto) ? 'red' : 'black', color: 'white' }}
          >
            Puesto {puesto}
          </button>
        ))}
      </div>
      {selectedPuestos.length > 0 && (
        <div>
          <button onClick={handleSubmit} className="reserve-button">
            Reservar
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;