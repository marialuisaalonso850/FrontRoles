import { useState } from 'react';
import PortalLayout from '../layout/PortalLayout';
import { useAuth } from "../Autenticacion/AutProvider";
import '../assets/perfil.css';

function PerfilFormulario() {
  const auth = useAuth();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [foto, setFoto] = useState(null);

  const handleFotoSeleccionada = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFoto(e.target.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleActualizarInformacion = async () => {
    try {
      const response = await fetch('/api/actualizar-perfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({
          nombre,
          apellido,
          foto,
        }),
      });

      if (response.ok) {
        console.log('Perfil actualizado con éxito');
      } else {
        console.error('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error en la solicitud para actualizar el perfil', error);
    }
  };

  return (
    <div className='perfil-formulario'>
      <h1>Perfil {auth.getUser() ? auth.getUser().gmail : ""}</h1>
      

      <input type="file" accept="image/*" onChange={handleFotoSeleccionada} />
      {foto && (
        <img src={foto} alt="Imagen seleccionada" className="imagen-circular" />
      )}

      <h2>Correo: {auth.getUser() ? auth.getUser()._id : ""}</h2>
      <label htmlFor="nombre">Nombre</label>
      <input type="text" placeholder="Ingrese nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label htmlFor="apellido">Apellido</label>
      <input type="text" placeholder="Ingrese apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />

      <button onClick={handleActualizarInformacion}>Actualizar información</button>
    </div>
  );
}

function MiComponente() {
  return (
    <div className='perfil'>
      <PortalLayout>
        <PerfilFormulario />
      </PortalLayout>
    </div>
  );
}

export default MiComponente;
