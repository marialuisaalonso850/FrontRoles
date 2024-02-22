// CarCard.js

import React from 'react';

const CarCard = ({ carImage, estado, onEstadoChange }) => {
  const handleEstadoChange = (nuevoEstado) => {
    onEstadoChange(nuevoEstado);
  };

  return (
    <div style={{ ...styles.card, backgroundColor: getBackgroundColor(estado) }}>
      <img src={carImage} alt="Car" style={styles.carImage} />
      <div style={styles.buttonContainer}>
        <button onClick={() => handleEstadoChange('ocupado')}>Ocupado</button>
        <button onClick={() => handleEstadoChange('disponible')}>Disponible</button>
        <button onClick={() => handleEstadoChange('reservado')}>Reservar</button>
      </div>
    </div>
  );
};

const getBackgroundColor = (estado) => {
  switch (estado) {
    case 'ocupado':
      return 'red';
    case 'disponible':
      return 'green';
    case 'reservado':
      return 'yellow';
    default:
      return 'white';
  }
};

const styles = {
  card: {
    position: 'relative',
    width: '300px',
    height: '200px',
    margin: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  carImage: {
    width: '100%',
    height: '60%',
    objectFit: 'cover',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
};

export default CarCard;
