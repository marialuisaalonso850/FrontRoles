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
  const [reservedTimes, setReservedTimes] = useState([]); // Almacenar horas reservadas
  const [error, setError] = useState('');

  useEffect(() => {
    const storedSelectedPuestos = localStorage.getItem('selectedPuestos');
    if (storedSelectedPuestos) {
      setSelectedPuestos(JSON.parse(storedSelectedPuestos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedPuestos', JSON.stringify(selectedPuestos));
  }, [selectedPuestos]);

  useEffect(() => {
    // Al obtener la fecha, se debe cargar las horas reservadas para esa fecha
    const fetchReservedTimes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reserva?date=${date.toISOString().slice(0, 10)}`);
        const reservedTimes = response.data.map(reserva => reserva.time);
        setReservedTimes(reservedTimes);
      } catch (error) {
        console.error('Error al obtener las horas reservadas:', error);
      }
    };

    fetchReservedTimes();
  }, [date]);

  const handleDateChange = date => {
    setDate(date);
  };

  const handlePuestoSelect = (puesto) => {
    if (selectedPuestos.includes(puesto)) {
      setSelectedPuestos(selectedPuestos.filter(item => item !== puesto));
    } else {
      setSelectedPuestos([...selectedPuestos, puesto]);
    }
  };

  const handleSubmit = async () => {
    // Verificar si la hora seleccionada está reservada
    if (reservedTimes.includes(time)) {
      setError('La hora seleccionada ya está reservada.');
      return;
    }

    const reservationData = {
      date: date,
      time: time,
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      lugaresSeleccionados: selectedPuestos
    };

    try {
      const response = await axios.post('http://localhost:5000/api/reserva', reservationData);
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
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleSubmit} className="reserve-button">
            Reservar
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
