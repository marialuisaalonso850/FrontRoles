
import React, { useState } from 'react';
import '../assets/puestos.css';

const Puestos = () => {
  const [asientosOcupados, setAsientosOcupados] = useState(Array(10).fill(false));
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = (index) => {
    const nuevosAsientosOcupados = [...asientosOcupados];
    nuevosAsientosOcupados[index] = !nuevosAsientosOcupados[index];
    setAsientosOcupados(nuevosAsientosOcupados);
  };

  const handleReservarClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="container">
      <div className="element-container">
        <div className="bus">
          <div className="bus-container">
            {/* Primer grupo de tarjetas */}
            <div className="card-bus">
              {asientosOcupados.slice(0, 4).map((ocupado, index) => (
                <div
                  key={index}
                  className={`card ${ocupado ? 'ocupado' : ''}`}
                  onClick={() => handleClick(index)}
                >
                  {ocupado ? 'Ocupado' : '0'}
                </div>
              ))}
            </div>

            {/* Segundo grupo de tarjetas */}
            <div className="card-bus">
              {asientosOcupados.slice(4).map((ocupado, index) => (
                <div
                  key={index + 4}
                  className={`card ${ocupado ? 'ocupado' : ''}`}
                  onClick={() => handleClick(index + 4)}
                >
                  {ocupado ? 'Ocupado' : '0'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button  onClick={handleReservarClick}>
        Reservar Asiento
      </button>

      {/* Modal */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Felicidades, reserva exitosa</h2>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Puestos;
