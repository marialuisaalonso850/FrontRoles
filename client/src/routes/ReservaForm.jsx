// ReservaForm.js

import React, { useState } from 'react';

const ReservaForm = ({ onReservaSubmit, onClose }) => {
  const [placa, setPlaca] = useState('');
  const [nombrePropietario, setNombrePropietario] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [informacion, setInformacion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservaData = {
      placa,
      nombrePropietario,
      fecha,
      hora,
      informacion,
    };

    onReservaSubmit(reservaData);
  };

  return (
    <div>
      <h3>Formulario de Reserva</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="placa">Placa del carro:</label>
        <input
          type="text"
          id="placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          required
        />

        <label htmlFor="nombrePropietario">Nombre del propietario:</label>
        <input
          type="text"
          id="nombrePropietario"
          value={nombrePropietario}
          onChange={(e) => setNombrePropietario(e.target.value)}
          required
        />

        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <label htmlFor="hora">Hora:</label>
        <input
          type="time"
          id="hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />

        <label htmlFor="informacion">Información relevante:</label>
        <textarea
          id="informacion"
          value={informacion}
          onChange={(e) => setInformacion(e.target.value)}
        />

        <button type="submit">Confirmar Reserva</button>
      </form>

      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ReservaForm;


